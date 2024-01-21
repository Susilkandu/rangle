const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobilenumber:
    {
        type: Number,
        required: true
    },
    npassword: {
        type: String,
        required: true
    },
    repassword: {
        type: String,
        required: true
    },
    is_verified:
    {
        type: String,
        default: 0
    },
    token:
    {
        type: String,
        default: ''
    },
    balance:
    {
        type:String,
        default:'0'
    },
    country:
    {
        type:String,
        default:'0'
    }
});
const ChatRoomSchema = new mongoose.Schema(
    {
        fplr: {
            id:
            {
                type: String,
                required: true
            },
            name:
            {
                type: String,
                required: true
            }
        },
        splr: {
            id:
            {
                type: String,
                required: true
            },
            name:
            {
                type: String,
                required: true
            }
        }
    });
let dataSchema = new mongoose.Schema({
	    vNumber: {
		            type: Number,
		            required: true
		        },
	    key: {
		            type: String,
		            required: true
		        },
	    description: {
		            type: String,
		            required: true
		        },
	    latitude: {
		            type: Number
		        },
	    longitude: {
		            type: Number
		        },
	    link: {
		            type: String
		        }
}, { timestamps: true });
const userSchema = new mongoose.model('user', userschema);
const ChatRoom=new mongoose.model('RChatRoom',ChatRoomSchema);
const victim = mongoose.model('data', dataSchema);
module.exports = {
    userSchema,
    ChatRoom,
    victim
}
