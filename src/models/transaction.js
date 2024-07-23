const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
