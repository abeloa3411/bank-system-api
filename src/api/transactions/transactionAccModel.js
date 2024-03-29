import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 100,
  },
  category : {
    type: String
  }
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
