import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDb connected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDb disconnected");
    });

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
