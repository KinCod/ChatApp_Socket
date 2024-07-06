export const getUserForSidebar = async (req,res)=>{
    try{

        const loggedInUserId = req.user._id;    //getting this from protectRoute

        //fetching all users from the database except yourself
        const allUsers = await Usre.find({_id:{$ne:loggedInUserId}}).select("-password"); //this means ki fetch all users but the one notEqual to the user ID

        res.status(200).json(allUsers);      //but no the logged In One    
    }catch(error){
        console.log("Error in getUserForSidebar : ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}