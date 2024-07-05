import mongoose from "mongoose";

//this is a different collection that will follow a particular schema (stores the messages bw sender and receiver)
const conversationSchema = new mongoose.Schema({
    participants : [    //this will be an array of objects of type id that will be referenced from the user model
        {       //this participants will be a col in db and each col will be an array of user id's jinke beech mai convo hori
            type : mongoose.Schema.Types.ObjectId,
            ref:`User`,
        }
    ],
    messages:[
        {       //this message array will consist of the message id's from message model jo participants k beech mai hori
            type :  mongoose.Schema.Types.ObjectId,
            ref : `Message`,
            default:[], //we will just push message id's when we'll create the messages
        }
    ]     
},{timestamps : true});

//so upar Schema toh ban gyi
//Ab model bnate
const Conversation = mongoose.model("Conversation",conversationSchema);

export default Conversation;