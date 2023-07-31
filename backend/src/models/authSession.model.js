// this model is needed to keep track of user through two different routes in oauth process
const mongoose = require("mongoose");

const authSessionSchema = new mongoose.Schema({
    state: {
      type: String,
      required: true,
    },
    codeVerifier: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }
  });

const AuthSession = mongoose.model('AuthSession', authSessionSchema);

module.exports = AuthSession;