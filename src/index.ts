require('dotenv').config();
import express from 'express';
import router from './router';

const app = express();
const PORT = process.env.PORT;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
