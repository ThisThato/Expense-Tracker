const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require("../controllers/transactionscontroller");

//Sent from the controller
//gets the methods from the controller
router
  .route("/")
  .get(getTransactions)
  .post(addTransaction);

router.route("/:id").delete(deleteTransaction);

//export the router to use it in the server.js
module.exports = router;
