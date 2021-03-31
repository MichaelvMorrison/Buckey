const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  bid: {
    type: String,
    default: 0
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;