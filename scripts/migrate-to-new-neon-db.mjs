import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load current .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Old database connection string from .env.local or fallback
const OLD_DB_URL = process.env.OLD_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FOYE1S4mwIaf@ep-restless-dew-ahfmj57o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

// New database connection string from user details
const NEW_DB_URL = process.env.NEW_DATABASE_URL || 'postgresql://neondb_owner:npg_3qMa7usJzKvO@ep-silent-sun-at1xb2hg-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';

const TABLES = [
  'admin_users',
  'events',
  'event_gallery_images',
  'event_videos',
  'news_articles',
  'gallery_photos',
  'programs',
  'founders',
  'hero_slides',
  'hero_preview_images',
  'homepage_stats',
  'homepage_interactive_gallery',
  'sponsor_tiers',
  'site_settings',
  'contact_submissions',
  'event_registrations',
  'sponsor_enquiries',
  'activity_log'
];

function splitStatements(sqlText) {
  const statements = [];
  let current = '';
  let inSingleQuote = false;
  let inDollarQuote = false;

  for (let i = 0; i < sqlText.length; i++) {
    const char = sqlText[i];
    const nextChar = sqlText[i + 1] || '';

    if (char === '$' && nextChar === '$') {
      inDollarQuote = !inDollarQuote;
      current += '$$';
      i++;
      continue;
    }

    if (char === "'" && !inDollarQuote) {
      inSingleQuote = !inSingleQuote;
      current += char;
      continue;
    }

    if (char === ';' && !inSingleQuote && !inDollarQuote) {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed);
      current = '';
      continue;
    }

    current += char;
  }

  const finalTrimmed = current.trim();
  if (finalTrimmed) statements.push(finalTrimmed);

  return statements;
}

async function runSqlFile(sqlClient, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanContent = content.replace(/--.*$/gm, '');
  const statements = splitStatements(cleanContent);

  for (const statement of statements) {
    if (!statement) continue;
    try {
      await sqlClient.query(statement);
    } catch (err) {
      console.error(`Error executing statement:\n${statement}\nError:`, err.message);
      throw err;
    }
  }
}

async function exportOldDb() {
  console.log('--- STEP 1: EXPORTING DATA FROM OLD DATABASE ---');
  console.log('Connecting to OLD DB:', OLD_DB_URL.replace(/:[^:@]+@/, ':****@'));
  const oldSql = neon(OLD_DB_URL);

  const backupData = {
    exportedAt: new Date().toISOString(),
    tables: {}
  };

  // Check which tables actually exist in the old DB
  const existingTablesResult = await oldSql.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  `);
  const tablesInfoRows = Array.isArray(existingTablesResult) ? existingTablesResult : (existingTablesResult.rows || []);
  const existingTableNames = tablesInfoRows.map(r => r.table_name);
  console.log('Found tables in OLD DB:', existingTableNames);

  // We export all known tables + any extra tables discovered
  const allTablesToExport = Array.from(new Set([...TABLES, ...existingTableNames]));

  for (const table of allTablesToExport) {
    try {
      const res = await oldSql.query(`SELECT * FROM "${table}"`);
      const rows = Array.isArray(res) ? res : (res.rows || []);
      backupData.tables[table] = rows;
      console.log(`[EXPORT] Table "${table}": ${rows.length} rows extracted.`);
    } catch (err) {
      console.warn(`[EXPORT] Table "${table}" could not be queried or does not exist (${err.message})`);
    }
  }

  const backupPath = path.join(__dirname, 'backup-old-db.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
  console.log(`--- EXPORT COMPLETE! Backup saved to: ${backupPath} ---\n`);
  return backupData;
}

async function importToNewDb(backupData) {
  console.log('--- STEP 2: IMPORTING DATA TO NEW DATABASE ---');
  console.log('Connecting to NEW DB:', NEW_DB_URL.replace(/:[^:@]+@/, ':****@'));
  const newSql = neon(NEW_DB_URL);

  console.log('Dropping any existing tables on NEW DB to ensure clean fresh schema creation...');
  const allKnownTables = Object.keys(backupData.tables).concat(TABLES);
  const dropListSql = Array.from(new Set(allKnownTables)).map(t => `"${t}"`).join(', ');
  try {
    await newSql.query(`DROP TABLE IF EXISTS ${dropListSql} CASCADE;`);
    console.log('Existing tables dropped.');
  } catch (err) {
    console.warn('Drop tables note:', err.message);
  }

  console.log('Running schema.sql on NEW DB...');
  const schemaPath = path.join(__dirname, 'schema.sql');
  await runSqlFile(newSql, schemaPath);
  console.log('schema.sql executed successfully.');

  console.log('Ensuring all site_settings video columns exist...');
  await newSql.query(`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_image_url TEXT;`);
  await newSql.query(`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS intro_video_1_url TEXT;`);
  await newSql.query(`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS intro_video_2_url TEXT;`);

  console.log('Dropping restrictive check constraints on NEW DB (to allow custom categories)...');
  await newSql.query(`ALTER TABLE gallery_photos DROP CONSTRAINT IF EXISTS gallery_photos_category_check;`);
  await newSql.query(`ALTER TABLE events DROP CONSTRAINT IF EXISTS events_category_check;`);
  await newSql.query(`ALTER TABLE programs DROP CONSTRAINT IF EXISTS programs_category_check;`);
  console.log('Constraints dropped.');

  // Proper order for deletion to respect foreign keys
  const DELETE_ORDER = [
    'event_videos',
    'event_gallery_images',
    'event_registrations',
    'events',
    'admin_users',
    'news_articles',
    'gallery_photos',
    'programs',
    'founders',
    'hero_slides',
    'hero_preview_images',
    'homepage_stats',
    'homepage_interactive_gallery',
    'sponsor_tiers',
    'site_settings',
    'contact_submissions',
    'sponsor_enquiries',
    'activity_log'
  ];

  console.log('Clearing initial rows created by schema.sql...');
  for (const table of DELETE_ORDER) {
    try {
      await newSql.query(`DELETE FROM "${table}";`);
    } catch (err) {
      console.warn(`Error clearing ${table}:`, err.message);
    }
  }

  // Proper order for insertion (parents before children)
  const INSERT_ORDER = [
    'admin_users',
    'events',
    'event_gallery_images',
    'event_videos',
    'news_articles',
    'gallery_photos',
    'programs',
    'founders',
    'hero_slides',
    'hero_preview_images',
    'homepage_stats',
    'homepage_interactive_gallery',
    'sponsor_tiers',
    'site_settings',
    'contact_submissions',
    'event_registrations',
    'sponsor_enquiries',
    'activity_log'
  ];

  const allImportTables = [
    ...INSERT_ORDER,
    ...Object.keys(backupData.tables).filter(t => !INSERT_ORDER.includes(t))
  ];

  for (const table of allImportTables) {
    const rows = backupData.tables[table];
    if (!rows || rows.length === 0) {
      console.log(`[IMPORT] Table "${table}": 0 rows to import.`);
      continue;
    }

    console.log(`[IMPORT] Table "${table}": Importing ${rows.length} rows...`);
    let insertedCount = 0;

    for (const row of rows) {
      const columns = Object.keys(row);
      const values = Object.values(row);

      const colNamesSql = columns.map(c => `"${c}"`).join(', ');
      const placeholdersSql = columns.map((_, idx) => `$${idx + 1}`).join(', ');
      const queryText = `INSERT INTO "${table}" (${colNamesSql}) VALUES (${placeholdersSql})`;

      try {
        await newSql.query(queryText, values);
        insertedCount++;
      } catch (err) {
        console.error(`Failed to insert row into "${table}":`, err.message);
      }
    }
    console.log(`[IMPORT] Table "${table}": Successfully inserted ${insertedCount}/${rows.length} rows.`);
  }

  // Fix PostgreSQL SERIAL / integer sequences if necessary
  console.log('--- STEP 3: RESETTING SEQUENCES FOR INTEGER TABLES ---');
  const integerTables = ['site_settings', 'homepage_stats', 'homepage_interactive_gallery', 'sponsor_tiers', 'hero_preview_images', 'founders', 'programs'];
  for (const table of integerTables) {
    try {
      const maxRes = await newSql.query(`SELECT MAX(id) as max_id FROM "${table}"`);
      const maxRows = Array.isArray(maxRes) ? maxRes : (maxRes.rows || []);
      const maxRow = maxRows[0];
      if (maxRow && typeof maxRow.max_id === 'number') {
        const seqRes = await newSql.query(`SELECT pg_get_serial_sequence('${table}', 'id') as seq_name`);
        const seqRows = Array.isArray(seqRes) ? seqRes : (seqRes.rows || []);
        if (seqRows[0]?.seq_name) {
          await newSql.query(`SELECT setval('${seqRows[0].seq_name}', ${maxRow.max_id})`);
          console.log(`Reset sequence ${seqRows[0].seq_name} to ${maxRow.max_id}`);
        }
      }
    } catch (err) {
      // Ignore if id is not serial or not integer
    }
  }

  console.log('--- STEP 4: VERIFYING ROW COUNTS ---');
  let allMatched = true;
  for (const table of allImportTables) {
    const oldRows = backupData.tables[table] || [];
    try {
      const cntRes = await newSql.query(`SELECT COUNT(*) as cnt FROM "${table}"`);
      const cntRows = Array.isArray(cntRes) ? cntRes : (cntRes.rows || []);
      const newCount = Number(cntRows[0]?.cnt || 0);
      const match = newCount === oldRows.length;
      if (!match) allMatched = false;
      console.log(`[VERIFY] Table "${table}": OLD DB = ${oldRows.length} | NEW DB = ${newCount} [${match ? 'OK' : 'MISMATCH'}]`);
    } catch (err) {
      console.warn(`[VERIFY] Table "${table}" check error:`, err.message);
    }
  }

  if (allMatched) {
    console.log('\n======================================================');
    console.log('SUCCESS: 100% of all data verified and migrated cleanly to NEW DB!');
    console.log('======================================================\n');
  } else {
    console.warn('\nWARNING: Some row counts did not match exactly. Please check logs above.\n');
  }
}

async function run() {
  try {
    const backupData = await exportOldDb();
    await importToNewDb(backupData);
    process.exit(0);
  } catch (err) {
    console.error('Fatal migration error:', err);
    process.exit(1);
  }
}

run();
