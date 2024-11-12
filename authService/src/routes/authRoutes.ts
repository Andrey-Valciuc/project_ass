import jwt from 'jsonwebtoken';
import { Router, Request, Response, RequestHandler } from 'express';
import pool from '../db';

const router = Router();


const registerUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }


        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const loginUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        if (user.rows[0].password !== password) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET || 'token',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
