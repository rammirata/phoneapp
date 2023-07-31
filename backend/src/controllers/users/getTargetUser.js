const {success, serverError} = require('../../utils/response')

const getTargetUser = async (req, res) => {

    try {
        const { targetUser } = req.$scope;
        return success(res, message="User successfully retrieved", {name: targetUser.name, username: targetUser.username});
    } catch (err) {
        return serverError(res, message="Unkown server error")
    }
  };

module.exports = getTargetUser;