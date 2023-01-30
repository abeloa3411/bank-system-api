import User from "../model/user.js";

export const userLogin = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.login(name);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userSignup = async (req, res) => {
  const { name, birth } = req.body;

  try {
    const user = await User.signup(name, birth);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
