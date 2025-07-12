import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,    
    },
    email: {
        type : String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified :{
        type : Boolean,
        default : false,  
    },
    isAdmin :{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry :Date,
    verifyToken :String,
    verifyTokenExpiry : Date,
},{ timestamps: true });

const User = mongoose.model("User", userSchema) || mongoose.models.User;
export default User;