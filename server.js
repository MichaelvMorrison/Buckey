const express = require('express');

const app = express();
const port = 3000;

const server  = app.listen(port, () => console.log(`\nlistening on port: ${port}`));
app.use(express.static('public'));