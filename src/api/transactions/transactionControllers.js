import Account from "./transactionAccModel.js";

//creating an account for all the transactions
//you have to be logged in before creating
export const createAcc = async (req, res) => {
  try {
    //create a new instance of account
    const newAcc = new Account({
      user: req.userId,
      category: req.body.category,
    });

    //save the account instance to db
    const isSaved = await newAcc.save();

    //response
    res.status(200).json({
      isSaved,
      response: `Account created succesfully`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//adding money to you account
export const addFunds = async (req, res) => {
  //get the balance and id
  const { amount } = req.body;
  const { id } = req.params;

  try {
    //update the account with the new amount
    const newAmnt = await Account.updateOne(
      { _id: id },
      { $inc: { balance: parseFloat(amount) } }
    );

    //response
    res.status(200).json({
      newAmnt,
      response: `You have succesfully deposited $ ${amount} in your account`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//withdraw funds from your account
export const withdrawFunds = async (req, res) => {
  //get the balance and id
  const { amount } = req.body;
  const { id } = req.params;
  try {
    //update the new amount
    const newAmnt = await Account.updateOne(
      {
        _id: id,
      },
      { $inc: { balance: parseFloat(-amount) } }
    );

    //respones
    res.status(200).json({
      newAmnt,
      response: `You have succefully withdraw $ ${amount} from you account`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//tranfer funds to another user's account
export const transferFunds = async (req, res) => {
  const { amount } = req.body; //amount to be send
  const { id } = req.params; //account to send funds
  const { funds } = req.query; //account to recieve funds
  try {
    //get the sender's account
    const sender = await Account.findById(id);

    //deduct the balance
    const newBal = sender.balance - amount;

    //check for insuficient balance

    if (newBal <= 0) {
      throw Error("Insufficient balance");
    }

    //update the new balance
    const updatedBal = await Account.updateOne(
      { _id: id },
      {
        balance: newBal,
      }
    );

    //update the reciever account balance
    const recieverNewBal = await Account.updateOne(
      { _id: funds },
      {
        $inc: { balance: amount },
      }
    );

    //response
    res.status(200).json({
      recieverNewBal,
      updatedBal,
      response: `You have succesfully transfered $ ${amount}`,
    });
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
    res.status(200).json({ balance: remBal[0].balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
