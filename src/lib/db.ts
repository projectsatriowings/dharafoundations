import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    signal: AbortSignal.timeout(5000), // 5s timeout – fall back to static data quickly
  },
});

export default sql;
