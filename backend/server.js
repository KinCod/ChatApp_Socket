import express from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";   //middle ware to access the cookies ()

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();          //app is an express function
const PORT = process.env.PORT || 5000; 

dotEnv.config();

//always keep this above the routes vrna req.body nhi kar paoge
app.use(express.json()); //to parse incoming requests from JSON payloads (from request.body)
                            //Mtlb agar kisi route se data request krra hu tab vo directly nhi le skta mai but iss middleware ko use karna hoga (Noice)  
app.use(cookieParser());

//making routes for auth and that will be done using a middleware
app.use("/api/auth", authRoutes);       //as soon as api/auth is seen we go to the authRoutes middleware
app.use("/api/message", messageRoutes);

// app.get("/",(req,res)=>{
//     //root route = http://localhost:5000/
//     res.send("hello bhaiji");
// })

app.listen(PORT,()=> {
    connectToMongoDB();     //we connect to mongo as soon as we connect to the port
        
    console.log(`http://localhost:${PORT}/`)        //this means ki port 5000 pe ek express server chalao
})                                                  //an uss api pe get post kuchbhi karo;
        