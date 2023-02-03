import Account from "../model/account.js";

//creating an account for all the transactions
//you have to be logged in before creating
export const createAcc = async (req, res) => {
  try {
    const newAcc = new Account({
      user: req.userId,
      accType: req.body,
    });

    const isSaved = await newAcc.save();

    res.status(200).json(isSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//adding money to you account
export const addFunds = async (req, res) => {
  const { balance } = req.body;
  const { id } = req.params;

  try {
    const newAmnt = await Account.updateOne(
      { _id: id },
      { $inc: { balance: parseFloat(balance) } }
    );
    res.status(200).json(newAmnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//withdraw funds from your account
export const withdrawFunds = async (req, res) => {
  const { balance } = req.body;
  const { id } = req.params;
  try {
    const newAmnt = await Account.updateOne(
      {
        _id: id,
      },
      { $inc: { balance: parseFloat(-balance) } }
    );

    res.status(200).json(newAmnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//tranfer funds to another user's account
export const transferFunds = async (req, res) => {
  const { balance } = req.body;
  const { id } = req.params;
  try {
    //get the user to recieve funds
    const sender = Account.findById(id);

    console.log(sender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all accounts that are in the database
export const allAccounts = async (req, res) => {
  try {
    const all = await Account.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
