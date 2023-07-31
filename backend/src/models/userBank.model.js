const mongoose = require("mongoose");

const UserBankSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  bankName: String,
  BIC: String,
  iban: String,
  accountType: String
});

const UserBank = mongoose.model('UserBank', UserBankSchema);

module.exports = UserBank;