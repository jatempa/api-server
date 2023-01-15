require('dotenv').config();
import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
