const {success, serverError, badRequest} = require('../../utils/response')
const PaymentRequest = require('../../models/paymentRequests.model'); 

const updatePaymentRequest = async (req, res) => {
    try {
      const { paymentId } = req.params;

      const updatedRequest = await PaymentRequest.findByIdAndUpdate(
        paymentId,
        { status: "completed" },
        { new: true }
      );
  
      if (!updatedRequest) {
        return badRequest(res, message="Payment request not found" );
      }
  
      return success(res, message="Successfully completed request");
    } catch (error) {
        console.log(error)
      return serverError(res, message="Unknown server error");
    }
  };
  
  module.exports = updatePaymentRequest;
