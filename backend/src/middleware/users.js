const User = require('../models/users.model')
const bcrypt = require('bcrypt');
const { badRequest, serverError } = require('../utils/response')


const checkIsDuplicated = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return badRequest(res, message="Email already in use")
        }
        return next()
    } catch (error) {
        return serverError(res, message="Unkown server error")
    }
}

const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.$scope.decodedToken.userId);
      if (!user) {
        return badRequest(res, 'User not found');
      }
      req.$scope.user = user;
      next();
    } catch (error) {
      return serverError(res, 'Unknown server error while finding user');
    }
  };

  const getTargetUser = async (req, res, next) => {
    try {
      const identifier = req.body.identifier || req.params.identifier;
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      });
      if (!user) {
        return badRequest(res, 'Target user not found');
      }
      req.$scope.targetUser = user;

      next();
    } catch (error) {
      return serverError(res, 'Unknown server error while finding target user');
    }
  };
  
const checkPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { targetUser } = req.$scope
        const isPasswordCorrect = await bcrypt.compare(password, targetUser.password);
    if (!isPasswordCorrect) {
        return badRequest(res, message="Incorrect password")
    }
        return next()
    } catch (error) {
        return serverError(res, message="Unkown server error")
    }

}

module.exports = {
    checkIsDuplicated: checkIsDuplicated,
    getUser: getUser,
    getTargetUser: getTargetUser,
    checkPassword: checkPassword
};