const User = require('../models/userModels');
const Admin= require('../models/adminModel');
const nodemailer = require('nodemailer');
const config = require('../config/config.js');
const Randomstring = require('randomstring');

const LoadAdminDashboard= async(req,res)=>{
    try {
        let tluser= await User.userSchema.count();
        let tlroom= await User.ChatRoom.count();
res.send(`Total User=${tluser}, Total Available room= ${tlroom}`);
    } catch (error) {
        console.log(error.message);
    }

}
module.exports={
    LoadAdminDashboard
}
