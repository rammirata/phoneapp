const axios = require('axios');
const {handleAPIError} = require("../../utils/error");
const {success} = require('../../utils/response')

const accountBalances = async (req, res, next) => {
    const {actionConfig, authorizationToken} = req.$scope
    const {iban} = req.query
  
    let params = {
      iban: iban,
    };
    
    try {
      const response = await axios({
        method: 'get',
        url: actionConfig.url,
        headers: {
          'Authorization': `Bearer ${authorizationToken}`
        },
        params: params
      });
  
      return success(res, message='Succesfully retrieved balances', response.data);
  
    } catch (error) {
      return handleAPIError(res, error);
    }
  }

  module.exports = accountBalances;