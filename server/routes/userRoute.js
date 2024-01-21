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
//  
const userController = require('../controller/userController');
app.get('/', auth.userisLogin_dash, userController.homeLoad);
app.get('/registration', userController.registrationLoad);
app.post('/registration', userController.insertUser);
app.get('/login', auth.userisLogin_dash, userController.loginLoad);
app.post('/login', userController.verifyLogin);
app.get('/forgotpassword', userController.forgotPasswordLoad);
app.post('/forgotpassword', userController.SendResetterlink);
app.get('/TypeNewPassword', userController.TypeNewPasswordLoad);
app.post('/TypeNewPassword', userController.SetNewPassword);
app.get('/ourservices', userController.ourservicesLoad);
app.get('/profile',auth.IsLogin,userController.profileLoad);
app.get('/update-profile', auth.IsLogin, userController.updateProfileLoad);
app.post('/update-profile',userController.updateProfile);
app.get('/ChatRandomly', auth.IsLogin, userController.ChatRandomlyLoad);

module.exports = app;
