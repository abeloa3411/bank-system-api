import Account from "../model/account.js";

export const addFunds = async (req, res) => {
  const amntAdded = req.body;
  const { id } = req.params;

  try {
    const newAmnt = Account.updateOne(
      { _id: id },
      { $inc: { balance: amntAdded } }
    );
    res.status(200).json(newAmnt);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const withdrawFunds = (req, res) => {
  res.send("You can withdraw funds");
};

export const transferFunds = (req, res) => {
  res.send("You can transfer funds");
};
