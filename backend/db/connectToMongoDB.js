//Now we'll connect to the DB and we'll do that using mongoose

import mongoose from 'mongoose';

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to MONGO");
    } catch (error) {
        console.log("Error connecting to MONGO" , error.message);
    }
}

export default connectToMongoDB;        //we export this function
                                    //used to connect to the mongo DB