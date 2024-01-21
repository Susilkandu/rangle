const userController=require('../controller/userController.js');
const userisLogin_dash = async(req,res,next)=>
{
    try {
        if (req.session.userid) {
            userController.userdashboardload(req,res);
        }
        else
    {

        next();
    }
    } catch (error) {
        console.log(error.message);
    }
}

const user_is_Logout= async(req,res,next)=>
{
    try {
        if (req.session.userid) {

        }
        else{
            
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
}
const IsLogin= async(req,res,next)=>
    {
        try {
            if(req.session.userid)            
            {
                next();
            }
            else
            {
                userController.homeLoad(req,res);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
module.exports={
   userisLogin_dash,
   user_is_Logout,
   IsLogin
}