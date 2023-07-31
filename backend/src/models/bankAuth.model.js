const mongoose = require("mongoose");

const BankAuthSchema = new mongoose.Schema({
        userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User'
        },
        bankName: String,
        authorizationToken: String
      });

const BankAuth = mongoose.model('BankAuth', BankAuthSchema);

module.exports = BankAuth;