import express from 'express';

const app = express();

app.get('/api/hello', (req, res) => {
  res.send('Hello. Welcome! Here is in Node.js');
});

export default app;
