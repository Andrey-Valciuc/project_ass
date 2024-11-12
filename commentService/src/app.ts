import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import commentRoutes from './routes/commentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Comment Service is up and running');
});


app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`Comment Service is running on http://localhost:${PORT}`);
});
