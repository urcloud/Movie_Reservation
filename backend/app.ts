import express from 'express';
import { errorHandler } from './helpers/error-helper';
import router from './route';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/hello', (req, res) => {
  res.send('Hello. Welcome! Here is in Node.js');
});

app.use('/api', router);

app.use(errorHandler);

export default app;
