const UserBank = require('../../models/UserBank.model');
const mongoose = require("mongoose");
const {success, serverError, badRequest} = require('../../utils/response')

const getTargetIban = async (req, res) => {
    try {
        const {targetUser} = req.$scope

        const userBank = await mongoose.model('UserBank').findOne({ userId: targetUser._id });
        if (!userBank) {
            return badRequest(res, message="No bank details found for this user")
        }
        return success(res, message="Iban successfully retrieved", {iban: userBank.iban, name: targetUser.name});

    } catch (err) {
        console.error(err);
        return serverError(res, message="Unkown server error")
    }
};

module.exports = getTargetIban;