import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
username :{
    type :String,
    required : [true, "Please Provide a username"],
    unique :true,
},
email :{
    type :String,
    required :[true ,"Please provide email"],
    unique :true
},
password :{
    type : String,
    required : [true , "Please provide a password"],
},
isVerfied :{
    type : Boolean,
    default : false,
},
isAdmin : {
    type : Boolean, 
    default : false,
},
forgotPasswordToken :String,
forgotPasswordTokenExpiry : Date,
},{timestamps :true});

const User = mongoose.model("User" ,userSchema) || mongoose.models.users;

export default User;