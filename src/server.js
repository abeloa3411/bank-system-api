import app from "./index.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true);

connectDB(process.env.MONGO_URI)
  .then(() => {
 if (process.env.NODE_ENV === "production") {
     app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
   
  })
  .catch((err) => console.log(err));
