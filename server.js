import app from "./index.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
