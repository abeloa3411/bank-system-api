import User from "./authModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2d" });
};

export const userLogin = async (req, res) => {
  const { pin, name } = req.body;

  try {
    //login the user to the db
    const user = await User.login(name, pin);

    //create the token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userSignup = async (req, res) => {
  const { name, birth, pin } = req.body;

  try {
    //sign up the user
    const user = await User.signup(name, birth, pin);

    //create the token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const all = await User.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
