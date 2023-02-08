import Account from "../model/account.js";

//creating an account for all the transactions
//you have to be logged in before creating
export const createAcc = async (req, res) => {
  try {
    //create a new instance of account
    const newAcc = new Account({
      user: req.userId,
      accType: req.body,
    });

    //save the account instance to db
    const isSaved = await newAcc.save();

    //response
    res.status(200).json(isSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//adding money to you account
export const addFunds = async (req, res) => {
  //get the balance and id
  const { balance } = req.body;
  const { id } = req.params;

  try {
    //update the account with the new balance
    const newAmnt = await Account.updateOne(
      { _id: id },
      { $inc: { balance: parseFloat(balance) } }
    );

    //response
    res.status(200).json(newAmnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//withdraw funds from your account
export const withdrawFunds = async (req, res) => {
  //get the balance and id
  const { balance } = req.body;
  const { id } = req.params;
  try {
    //update the new amount
    const newAmnt = await Account.updateOne(
      {
        _id: id,
      },
      { $inc: { balance: parseFloat(-balance) } }
    );

    //respones
    res.status(200).json(newAmnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//tranfer funds to another user's account
export const transferFunds = async (req, res) => {
  const { balance } = req.body;
  const { id } = req.params;
  const { funds } = req.query;
  try {
    //get the user to send funds
    const sender = await Account.findById(id);

    //deduct the balance
    const newBal = sender.balance - balance;

    //update the new balance

    if (newBal === 0) {
      throw Error("You insuficient balance");
    }

    const updatedBal = await Account.updateOne(
      { _id: id },
      {
        balance: newBal,
      }
    );

    //get the account to recieve the funds

    const reciever = await Account.findById(funds);

    //update the reciever account balance
    const recieverNewBal = await Account.updateOne(
      { _id: funds },
      {
        $inc: { balance: balance },
      }
    );

    //response
    res.status(200).json({ recieverNewBal, updatedBal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all accounts that are in the database
export const allAccounts = async (req, res) => {
  try {
    //get all accounts
    const all = await Account.find();

    //response
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get balance

export const getBalance = async (req, res) => {
  const { id } = req.params;
  try {
    //get remaining balance from db
    const remBal = await Account.find({ _id: id });

    //response
    res.status(200).json({ balance: remBal.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
