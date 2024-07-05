import mongoose from "mongoose";

//this is a different collection that will follow a particular schema (stores the messages bw sender and receiver)
const messageSchema = new mongoose.Schema({
     senderId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",       //this says ki ye jo ID hogi ye reference legi from the user model, mtlb obv sender ek user hoga hi and user model mai user ki details hai toh uss user ki id hi lega ye idhar (we'll see how)
        required : true,

     },
     receiverId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",       //this says ki ye jo ID hogi ye reference legi from the user model, mtlb obv sender ek user hoga hi and user model mai user ki details hai toh uss user ki id hi lega ye idhar (we'll see how)
        required : true,

     },
     message : {
        type : String,
        required : true
     }
     //created at and updated at fields for the message will be automatically given with the help of jo niche likha(timestamp-->Provided by mongoose)
},{timestamps : true});

//so upar Schema toh ban gyi
//Ab model bnate
const Message = mongoose.model("Message",messageSchema);

export default Message;