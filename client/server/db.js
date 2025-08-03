// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Hexaware Database',
  password: 'RAGHU621993',
  port: 5432,
});
pool.connect();
export default pool;