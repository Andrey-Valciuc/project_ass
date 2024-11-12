
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export interface AuthenticatedRequest extends Request {
    user?: { userId: number; email: string };
}


export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(403).json({ message: 'Access denied, no token provided' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'toke', (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }


        req.user = decoded as { userId: number; email: string };
        next();
    });
};
