const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 1135;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, console.log(`Listening to port ${port}...`));
