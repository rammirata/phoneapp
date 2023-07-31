const {success, serverError} = require('../../utils/response')
const PaymentRequest = require('../../models/paymentRequests.model'); 

const getPaymentRequests = async (req, res) => {
    const { type, status } = req.query;
    const { user } = req.$scope;

    let query;

    if (type === 'made') {
        query = {userId: user._id};
    } else if (type === 'received') {
        query = {targetUserId: user._id};
    } else {
        // If type is not specified, get all requests related to the user
        query = {$or: [{userId: user._id}, {targetUserId: user._id}]};
    }

    if (status) {
        query.status = status;
    }

    try {
        const paymentRequests = await PaymentRequest.find(query);
        return success(res, 'Successfully retrieved requests', paymentRequests);
    } catch (error) {
        return serverError(res, "Unknown server error");
    }
};

module.exports = getPaymentRequests;
