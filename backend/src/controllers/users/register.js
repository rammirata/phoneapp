const User = require('../../models/users.model')
const bcrypt = require('bcrypt');
const {success, serverError} = require('../../utils/response')

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ email: email, password: hashedPassword, name: name, username:username });
    newUser.save();
    return success(res, message="New user created");
    
  } catch (error) {
    return serverError(res, message="Unkown server error")
  }
};

module.exports = register;