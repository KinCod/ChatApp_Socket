import Conversation from "../models/coversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body; //getting message from user as an input
        
        //jo user logged in hai ,ie, jiski jwt se id aayi hai vo sender hai and jiski params mai id hai vo receiver hai 
        const receiverId = req.params.id;        //jis route se ye method linked hai usmai hi given hoga id as params
        const senderId = req.user._id;          //ye tab hi aaega jab actually user exist krta hoga vrna in message.route.js jo iss method se peeche middleware hai that will stop the flow of code to enter this fucntion

        //checking ki id in 2 users k beech pehle conversation store huyi hai ya nhi
        let conversation = await Conversation.findOne({
            participants : {$all:[senderId,receiverId]},    //all ka mtlb hai ki finding aisi array jismai all ie sender and receiver id both ho
            //at this point for particular document jo message object hoga vo empty array hoga because in The convo Schema humne message object ko by default NULL ARRAy rakha hai for each entry
        });

        if(!conversation){  //agar conversation nhi hai then we make one
            conversation = await Conversation.create({
                participants : [senderId,receiverId],
            })
        }

        const newMessage = new Message.create({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            //agar NewMessage create hogya bw sender and receiver tab jo previously apne conversation
            //either fetch kri ya form kri uske message array k andar ye message id push krdo.
            //see the schema of conversation collection. Usmai we have participants and message array, 
            //so for the participants humne sender receiver id to daal dia and jab message collection mai
            //message add krdia tab uss message ki id humne converstion mai daal dia

            //for basically for two or more users we are putting the id of message into the conversation tuple of them.
        }

        //⁡⁣⁢⁣​‌‌‍𝗟𝗮𝘁𝗲𝗿 𝗪𝗲'𝗹𝗹 𝗮𝗱𝗱 𝗦𝗼𝗰𝗸𝗲𝘁 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝗮𝗹𝗶𝘁𝘆​⁡

        res.status(201).json(newMessage);

    } catch(error){
        console.log("Error in sendMessage Controller", error.message);
        res.status(500).json({error : "Internal Server error"});
    }
}

export const getMessage = async(req,res)=>{
    try{
        const userToChatId = req.params.id; //jo user message bhejra uski id
        const senderId = req.user._id;      //coming from protectRoute middleware

        const conversation = await Conversation.findOne({
            participants : { $all: [senderId,userToChatId]},
        }).populate("messages");
        //here we are using populate method so that jab converstion variable mai conversation collection se
        //data fetch hoga tab conversation.message mai sirf message ki id's hongi and unn ids se hum message collection se message ekek krke dekh skte
        //but we want to populate related id wale messages from the message collection to this messageArray present in Conversation collection
        //toh bas iske liye populate method with the related column to populate use hota
    
        if(!conversation) return res.status(200).json([]);
        
        const messages = conversation.messages;
        
        res.status(200).json(messages);    //now we return the whole array of messages for the particular coversation bw two users
    }catch(error){   
        console.log("Error in getMessage Controller", error.message);
        res.status(500).json({error : "Internal Server error"});
    }
}