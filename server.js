const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');

const api = require('./route/index');
const users = require('./route/users');

let app = express();
let port = 5000;

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static folders
app.use('/', express.static(path.join(__dirname, 'public')));

// MySQL connections
app.use((req, res, next) => {
    global.con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'websprint'
    });
    // global.con.connect();
    next();
});

// set the default root
app.get('/', (req, res) => {
    res.render('index');
});

// setting up router
app.use('/api', api);
app.use('/users', users);

// list to the server
app.listen(port, () => console.log(`Server started on port ${port}`));