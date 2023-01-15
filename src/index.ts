import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
