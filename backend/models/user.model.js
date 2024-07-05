import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true,
        minlength : 6
    },
    gender:{
        type: String,
        required: true,
        enum: ["male","female"] //only these values will be used in the gender column of user Table
    },
    profilePic:{
        type:String,
        default : ""
    }
},{timestamps : true});     //this gives a createdAt and UpdatedAt field in the db Collection

const User = mongoose.model("User",userSchema); //User is the model that will follow the userSchema

export default User;        //exporting the user Model