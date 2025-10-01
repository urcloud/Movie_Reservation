import express from 'express';
import { errorHandler } from './helpers/error-helper';

const app = express();

app.get('/api/hello', (req, res) => {
  res.send('Hello. Welcome! Here is in Node.js');
});

app.use(errorHandler);

export default app;
