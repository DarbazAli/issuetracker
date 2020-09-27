'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const projectsRoute = require('./routes/projectsRoute');
const { MongoClient } = require('mongodb');
const issueRoute = require('./routes/issueRoute');

const app = express();
require('dotenv').config();

console.clear();
const log = console.log;
global.log = log;


const MONGO_URI = process.env.MONGO_URI;


app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))


MongoClient
    .connect(MONGO_URI, { useUnifiedTopology: true})
    .then( client => {
        log('Connected to database')
        const db = client.db('issuetracker');
        const projects = db.collection('projects');

        app
            .route('/')
            .get( (req, res) => {
                projects.find().toArray((err, data) => {
                    if ( err ) log(err);
                    // log(data)
                    res.render('index', {projects: data})
                })
            })

        projectsRoute(app, projects)
        issueRoute(app, projects);

    })
    .catch( error => log(error))







const PORT = process.env.PORT || 3000
app.listen(PORT, log(`Server running on port ${PORT}`))

