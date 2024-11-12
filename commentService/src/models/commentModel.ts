import pool from '../db';


export const createComment = async (postId: number, content: string, authorId: number) => {
    const query = `
        INSERT INTO comments (post_id, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [postId, content, authorId];
    const result = await pool.query(query, values);
    return result.rows[0];
};


export const getCommentsByPost = async (postId: number) => {
    const query = `
        SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC;
    `;
    const values = [postId];
    const result = await pool.query(query, values);
    return result.rows;
};
