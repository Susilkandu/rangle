const User = require('../models/userModels');
const nodemailer = require('nodemailer');
const config = require('../config/config.js');
const Randomstring = require('randomstring');
const { json } = require('express');
const SendResetterMail = async (name, email, token, user_id,req,res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.email,
                pass: config.emailPassword
            }
        });
        const mailOption = {
            from: config.email,
            to: email,
            subject: 'To Reset  your screech Password',
            html: '<p>Hi ' + name + ', please click here to <a href="http://screech.in/TypeNewPassword?token=' + token + '&user_id=' + user_id + ' "> Reset Your Password</a></p>'
        };
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                res.render('pug/public/forgotpassword.pug', { message: ` Password Resetter Link Has Been Sent Your E-mail id:-${email} 💕` });
            }
        })
    }
    catch (error) {
        console.log(error.message);
    }
}
const homeLoad = async (req, res) => {
    try {
        res.render('pug/public/base.pug');
    } catch (error) {
        console.log(error.message);
    }
};
const registrationLoad = async (req, res) => {
    try {
        res.render('pug/public/registration.pug');
    } catch (error) {
        console.log(error.message);
    }
};
const insertUser = async (req, res) => {
    try {
        const userData = await new User.userSchema(req.body).save().then((userData) => {
            req.session.userid= userData._id;
            res.redirect('/login');
        }).catch((error) => {
            res.render('pug/public/registration.pug', { message: "  Email-id Is Already Exist/ You have not filled All filled! So Please Reset Your Password/fill All fields  "});
        });

    } catch (error) {
        console.log(error.message);
    }

}
const loginLoad = async (req, res) => {
    try {
        res.render('pug/public/login.pug');
    } catch (error) {
        console.log(error.message);
    }
}
const verifyLogin = async (req, res) => {
    try {
        let password = req.body.password;
        let email = req.body.email;
        let verification = await User.userSchema.findOne({ email: email, repassword: password });
        if (verification) {
                req.session.userid = await verification._id;
                res.render('pug/old_user_interface/startquiz/userdashboard.pug', { verification });
        } else {
            res.render('pug/public/login.pug', { message: " please enter the valid Username and Password " });
        }
    } catch (error) {
        console.log(error.message);
    }
}
const forgotPasswordLoad = async (req, res) => {
    try {
        res.render('pug/public/forgotpassword');
    } catch (error) {
        console.log(error.message);
    }
}
const SendResetterlink = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.userSchema.findOne({ email: email });
        if (userData) {
                const randomstring = Randomstring.generate();
                const upDatedData = await User.userSchema.updateOne({ email: email }, { $set: { token: randomstring } });
                SendResetterMail(userData.uname, userData.email, randomstring, userData._id,req,res);    
        }
        else {
            res.render('pug/public/forgotpassword', { message: ' Email id is not exist ' });
        }
    } catch (error) {
        console.log(error.message);
    }
}
const userdashboardload = async (req, res) => {
    try {
        const verification = await User.userSchema.findOne({ _id: req.session.userid });
        res.render('pug/old_user_interface/startquiz/userdashboard.pug', { verification });
    } catch (error) {
        console.log(error.message);
    }
};
const TypeNewPasswordLoad = async (req, res) => {
    try {
        res.render('pug/old_user_interface/TypeNewPassword.pug',{message:req.query});
    } catch (error) {
        console.log(error.message);
    }
}
const SetNewPassword = async (req, res) => {
    try {
        const token = req.body.token;
        const user_id = req.body.user_id;
        const npassword = req.body.npassword;
        const repassword = req.body.repassword;
        if (npassword === repassword && user_id) {
            const verification = await User.userSchema.findOne({ _id: user_id, token: token });
            if (verification) {
                const userData = await User.userSchema.updateOne({ _id: user_id, token: token }, { $set: { token: '', npassword: npassword, repassword: repassword } });
                req.session.userid = await verification._id
                res.redirect('/login');
            } else {
                res.render('pug/public/forgotpassword.pug', { message: ' Please Generate a Fresh resetter Link  ' });
            }
        } else {
            res.render('pug/public/forgotpassword.pug', { message: ' Please Generate a Fresh resetter Link  ' });
        }
    } catch (error) {
        console.log(error.message);
    }
}
const ourservicesLoad = async (req, res) => {
    try {
        res.render('pug/public/ourservices.pug', { verification: 'Something' });
    } catch (error) {
        console.log(error.message);
    }
}
const updateProfileLoad = async (req, res) => {
    try {
        const verification = await User.userSchema.findOne({ _id: req.session.userid, });
        res.render('pug/old_user_interface/update-profile.pug', { verification });
    } catch (error) {
        console.log(error.message);
    }
}
const profileLoad = async (req, res) => {
    try {
        const verification = await User.userSchema.findOne({ _id: req.session.userid });
        res.render('pug/old_user_interface/profile.pug', { verification });
    } catch (error) {
        console.log(error.message);
    }
};
const ChatRandomlyLoad = async (req, res) => {
    try {
        const verification = await User.userSchema.findOne({ _id: req.session.userid });
        res.render('pug/old_user_interface/startquiz/chatRandomly/ChatRandomlyInterface.pug', { verification })
    } catch (error) {
        console.log(error.message)
    }
};
const updateProfile = async (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    let name = req.body.uname;
    let gender = req.body.gender;
    let country = req.body.country;
    const verification = User.userSchema.findOne({ _id: id }).then((verification) => {
        try {
            if (verification.repassword == password) {
                    User.userSchema.updateOne({ _id: id }, { $set: { uname: name, gender: gender, country: country } }).then((message) => {
                        res.send(`<h1>Success</h1>`)
                    }).catch((error) => {
                        console.log(error.message);
                    });
            } 
            else {
                res.send(`<h1>You Are Not Authentic Person</h1>`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }).catch((error) => {
        console.log(error.message);
    });
    

};

module.exports = {
    homeLoad,
    registrationLoad,
    insertUser,
    loginLoad,
    verifyLogin,
    userdashboardload,
    forgotPasswordLoad,
    SendResetterlink,
    TypeNewPasswordLoad,
    SetNewPassword,
    ourservicesLoad,
    ChatRandomlyLoad,
    profileLoad,
    updateProfileLoad,
    updateProfile,
}
