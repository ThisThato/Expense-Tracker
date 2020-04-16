//uses the predefined model
const Transaction = require("../models/Transaction");

//Get all transactions
//route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
}; //get all the transactions as a json object
//response from the serve hence the res

//Add transactions
//@route POST /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {
  try {
    //creates a transaction
    //accepts fields that are in the model {text, amount}
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
}; //adds a new transaction with the amount and text(description)
//request sent to the server and a response from the server

//Delete transactions
//route DELETE /api/v1/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    //finds a specific transaction by ID
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found"
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: false,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
//request and a response from the server

//Controller that interact with the database
//Is shaped by the Transaction model
