const express = require('express');
const app = express();
const config = require('../config/config.js');
const path = require('path');
// to use session
const session = require('express-session');
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 9999999999
    }
}));
//to require of the authentication system
const auth = require('../middleware/auth.js');

// to set the views
app.set('view engine', 'pug');
app.set('views', './views');

// to set the body parser
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// to set static element path
app.use(express.static('../assets'));
//  To load admin controller
const adminController = require('../controller/adminController');
// to set routes
app.get('/admin',adminController.LoadAdminDashboard);
module.exports=app;