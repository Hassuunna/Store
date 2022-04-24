import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, TEST_DB_NAME, ENV } = process.env;
const client = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: ENV === 'dev' ? DB_NAME : TEST_DB_NAME,
});

export default client;
