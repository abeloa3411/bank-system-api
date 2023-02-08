import mongoose from "mongoose";

//function to connect the app to db
const connectDB = (connectionString) => {
  return mongoose.connect(connectionString);
};

export default connectDB;
