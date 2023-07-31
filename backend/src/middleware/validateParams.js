const { validationResult } = require('express-validator');
const {badRequest} = require("../utils/response");


const validateParams = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badRequest(res, message=errors.array()[0].msg);
    }
    return next();
}


module.exports = validateParams;
