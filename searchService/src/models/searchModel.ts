import pool from '../db';

export const searchPosts = async (query: string) => {
    const searchQuery = `
        SELECT * FROM posts
        WHERE LOWER(title) LIKE LOWER($1) OR LOWER(content) LIKE LOWER($1)
        ORDER BY created_at DESC;
    `;
    const values = [`%${query}%`];

    try {
        const result = await pool.query(searchQuery, values);
        return result.rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Error fetching data from the database');
    }
};
