// to connect from the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/screech').then(() => {
    console.log("DATABASE CONNECTION IS SUCCUSSFULL");
}).catch((error) => {
    console.log(error);
    console.log("DATABASE CONNECTIVITY HAS BEEN FAILED");
});
const port = process.env.port ||8080 ;
const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const chatter= require('./chatter/chatter.js');
const adminRoute= require('./routes/adminRoute');
app.use('/', userRoute,adminRoute);
const server = app.listen(port, () => {
    console.log(`The screech server is running on the http://localhost:${port}/`);
});
// Socket
const chatting= require('socket.io')(server);
chatter.main(chatting);
