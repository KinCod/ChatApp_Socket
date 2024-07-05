import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async(req,res) =>{
    const {userName,password} = req.body;  //requesting email and password through the body of api

    try{
        //checking if userName exists in db k
        const user =await User.findOne({userName});

        if(!user) return res.status(400).json({error:"User does not exist"});
        
        //idhar aaenge agar user exist krta hai
        const isMatch = bcrypt.compareSync(password,user.password); //comparing password with hashed password in
        if(!isMatch) return res.status(400).json({error:"Wrong Password"});
    
        //idhar aagye mtlb password bhi match krta hai 
        //So ab hum iss user k liye JWT Token se kar skte
        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({          //responding back to the api
            _id:user._id,
            fullName: user.fullName,
            userName : user.userName,
            profilePic : user.profilePic
        })

    }catch(error){
        console.log("Error in Login Controller : ", error.message);       //it a good practice to tell where the error is as it helps in debugging
        res.status(500).json({error:"Internal Server Error"});
    }
    
};

export const logout = (req,res) =>{
    try {
        //we have to remove the JWT token ig
        res.cookie("jwt","",{maxAge:0});    //cookie khaali krdo and uski age 0 krdo
        return res.status(200).json({message : "logged Out Successfully"});

    } catch (error) {
        console.log("Error in signup Controller : ", error.message);       //it a good practice to tell where the error is as it helps in debugging
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const signup = async(req,res) =>{
    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;   //body mai json format mai likhe honge and we will just request it
    
        if(password != confirmPassword){
            //ye glti krdi hehe
            return res.status(400).json({error:"Passwords donot match"});
        }

        //Now we'll be calling the user Model as vo schema follow krenge and mongo mai ye saara data store krenge
        const user = await User.findOne({userName});        //agar user db mai pehle se hai toh check kro

        if(user) return res.status(400).json({error:"username exists"})
        
        //Hash Password
        const salt = await bcrypt.genSalt(10);    //generating salt
        const hashedPass = await bcrypt.hash(password,salt);        //idhar salt k sath hashing krdi

        //User image (isko gender wise DB mai store krenge and jab need hoga db se access krenge , say jab user login krega)
        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;


        //making new entry to DB
        const newUser  = new User({
            fullName,
            userName,
            password : hashedPass,
            gender,
            profilePic: gender === "male" ? boyProfile : girlProfile
        })

        generateTokenAndSetCookie(newUser._id,res);  //idhar token generate hoega and cookie mai store hojayega
        await newUser.save();           //saving user in the database

        if(newUser){
            res.status(201).json({          //responding back to the api
                _id:newUser._id,
                fullName: newUser.fullName,
                userName : newUser.userName,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(400).json({error:"Failed to create user"});
        }

        
    }catch(error){
        console.log("Error in signup Controller : ", error.message);       //it a good practice to tell where the error is as it helps in debugging
        res.status(500).json({error:"Internal Server Error"});
    }
};