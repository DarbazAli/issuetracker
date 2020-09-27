'use strict';

const express = require('express');
const app = express();

console.clear();
const log = console.log;

app
    .route('/')
    .get( (req, res) => res.send('Hello world'))


const PORT = process.env.PORT || 3000
app.listen(PORT, log(`Server running on port ${PORT}`))

