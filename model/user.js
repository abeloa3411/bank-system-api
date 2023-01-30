import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
});

//static signup method

UserSchema.statics.signup = async function (name, birth) {
  if (!name || !birth) {
    throw Error("Please fill in all fields");
  }

  //   if (!validator.isbirth(birth)) {
  //     throw Error("birth not valid");
  //   }

  const exists = await this.findOne({ birth: birth });

  if (exists) {
    throw Error("birth already exists");
  }

  const newUser = await this.create({
    name,
    birth,
  });

  return newUser;
};

//login method

UserSchema.statics.login = async function (birth) {
  if (!birth) {
    throw Error("Please fill in all fields");
  }

  const exists = await this.findOne({ birth: birth });

  if (!exists) {
    throw Error("No user with this birth");
  }

  return exists;
};

const User = mongoose.model("User", UserSchema);

export default User;
