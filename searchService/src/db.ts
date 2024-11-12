import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'post_db',
    password: '22504',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Error with the PostgreSQL connection:', err);
    process.exit(-1);
});

export default pool;
