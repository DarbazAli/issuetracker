'use strict';

const express = require('express');
const app = express();

console.clear();
const log = console.log;

app.set('view engine', 'pug');
app.set('views', 'views');

app
    .route('/')
    .get( (req, res) => res.render('index'))


const PORT = process.env.PORT || 3000
app.listen(PORT, log(`Server running on port ${PORT}`))

