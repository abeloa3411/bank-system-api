import Account from "../model/account.js";

export const createAcc = async (req, res) => {
  try {
    const newAcc = new Account({
      accType: req.body,
    });

    const isSaved = await newAcc.save();

    res.status(200).json(isSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addFunds = async (req, res) => {
  const { balance } = req.body;
  const { id } = req.params;

  try {
    const newAmnt = await Account.updateOne(
      { _id: id },
      { $inc: { balance: balance } }
    );
    res.status(200).json(newAmnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const allAccounts = async (req, res) => {
  try {
    const all = await Account.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const withdrawFunds = (req, res) => {
  res.send("You can transfer funds");
};

export const transferFunds = (req, res) => {
  res.send("You can transfer funds");
};
