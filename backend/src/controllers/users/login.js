const jwt = require('jsonwebtoken')
const {success, serverError} = require("../../utils/response")

const login = async (req, res) => {
  try {
      const { targetUser } = req.$scope
      jwt.sign({ userId: targetUser._id }, 'your_secret_key', { expiresIn: '100h' }, (err, token) => {
          if(err) {
              return serverError(res, message='Failed to generate token');
          } else {
              return success(res, message='Login successful', { token: token });
          }
      });
  } catch (error) {
      return serverError(res, 'Unknown server error');
  }
}

module.exports = login;