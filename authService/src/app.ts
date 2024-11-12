import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Auth Service is up and running');
});


app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service is running on http://localhost:${PORT}`);
});
