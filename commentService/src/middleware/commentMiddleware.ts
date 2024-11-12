import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a custom interface extending Express's Request type
export interface AuthenticatedRequest extends Request {
    user?: { userId: number; email: string };
}

// JWT Authentication Middleware
export const authenticateJWT = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');


    if (!token) {
        res.status(403).json({ message: 'Access denied, no token provided' });
        return;
    }


    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }


        req.user = decoded as { userId: number; email: string };
        next();
    });
};
