import mongoose from 'mongoose';

const DB_NAME = "DumboBlog"
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI,{
            dbName: DB_NAME,
        });
        console.log("Connection established. Connection Host : ", connectionInstance.connection.host);        
    }catch(error){
        console.log("Failed To Establish Connection : Error : ",error);
        process.exit(-1);
    }
}

export { connectDB };