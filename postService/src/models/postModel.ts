import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


export const createPost = async (title: string, content: string, author_id: number) => {
    const result = await pool.query(
        'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
        [title, content, author_id]
    );
    return result.rows[0];
};

export const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};
