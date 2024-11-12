import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/searchRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Search Service is up and running');
});


app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
    console.log(`Search Service is running on http://localhost:${PORT}`);
});
