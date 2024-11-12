import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Post Service is up and running');
});


app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Post Service is running on http://localhost:${PORT}`);
});
