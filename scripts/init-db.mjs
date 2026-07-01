import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('ERROR: DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(dbUrl);

function splitStatements(sqlText) {
  const statements = [];
  let current = '';
  let inSingleQuote = false;
  let inDollarQuote = false;

  for (let i = 0; i < sqlText.length; i++) {
    const char = sqlText[i];
    const nextChar = sqlText[i + 1] || '';

    // Check dollar quote $$
    if (char === '$' && nextChar === '$') {
      inDollarQuote = !inDollarQuote;
      current += '$$';
      i++;
      continue;
    }

    // Check single quote
    if (char === "'" && !inDollarQuote) {
      inSingleQuote = !inSingleQuote;
      current += char;
      continue;
    }

    // Check statement end
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

async function runSqlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Strip line comments first
  const cleanContent = content.replace(/--.*$/gm, '');
  const statements = splitStatements(cleanContent);

  for (const statement of statements) {
    if (!statement) continue;
    try {
      await sql.query(statement);
    } catch (err) {
      console.error(`Error executing statement:\n${statement}\nError:`, err.message);
      throw err;
    }
  }
}

async function run() {
  try {
    console.log('Connecting to Neon database...');
    
    console.log('Running schema.sql...');
    await runSqlFile(path.join(__dirname, 'schema.sql'));
    console.log('Schema created successfully!');

    console.log('Running seed.sql...');
    await runSqlFile(path.join(__dirname, 'seed.sql'));
    console.log('Seed data inserted successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

run();
