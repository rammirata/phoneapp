const {success, serverError} = require('../../utils/response')
const PaymentRequest = require('../../models/paymentRequests.model'); 

const createPaymentRequest = async (req, res) => {
    try {
        const { user, targetUser } = req.$scope;
        const userId = user._id
        const targetUserId = targetUser._id
        const {amount} = req.body

        const newPaymentRequest = new PaymentRequest({
          userId,
          targetUserId,
          amount
        });
    
        const savedRequest = await newPaymentRequest.save();
    
        return success(res, message='Succesfully added request');
      } catch (error) {
        return serverError(res, message="Unkown server error")
      }
    };

module.exports = createPaymentRequest;