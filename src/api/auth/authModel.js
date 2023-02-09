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
  pin: {
    type: String,
    required: true,
  },
});

//static signup method

UserSchema.statics.signup = async function (name, birth, pin) {
  if (!name || !birth || !pin) {
    throw Error("Please fill in all fields");
  }

  const exists = await this.findOne({ name: name });

  if (exists) {
    throw Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pin, salt);

  const newUser = await this.create({
    name,
    birth,
    pin: hash,
  });

  return newUser;
};

//login method

UserSchema.statics.login = async function (pin) {
  if (!pin) {
    throw Error("Please fill in all fields");
  }

  const exists = await this.findOne({ pin: pin });

  if (!exists) {
    throw Error("Incorrect pin");
  }

  const match = await bcrypt.compare(password, exists.pin);
  if (!match) {
    throw Error("Incorect pin");
  }

  return exists;
};

const User = mongoose.model("User", UserSchema);

export default User;
