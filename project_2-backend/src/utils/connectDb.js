import mongoose from 'mongoose';
import "dotenv/config.js";

const connectDB = ()=> {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch(error) {
    console.log(error);
  }
}

export default connectDB;
