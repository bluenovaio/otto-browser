/* eslint-disable */

const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.use('*', (req, res, next) => {
  res.status(500).send('Internal Server Error, please contact support@bluenova.io.');
});

app.listen(3881, () => {
  console.log('Server running on port 3881');
});
