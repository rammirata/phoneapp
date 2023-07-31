const querystring = require('querystring');
const axios = require('axios');
const AuthSession = require('../../models/AuthSession.model');
const BankAuth = require('../../models/BankAuth.model');
const {serverError} = require('../../utils/response')


const handleBankCallback = async (req, res, next) => {
    const { code, state } = req.query;
    const { bankConfig } = req.$scope;
  
    const authSession = await AuthSession.findOne({ state });
  
    const { codeVerifier, userId, bankName } = authSession;
  
    try {
      const tokenResponse = await axios.post(bankConfig.auth.tokenUrl, querystring.stringify({
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        client_id: bankConfig.clientId,
        client_secret: bankConfig.clientSecret,
        redirect_uri: bankConfig.redirectUri,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      const authorizationToken = tokenResponse.data.access_token;
  
      const filter = { userId: userId, bankName: bankName };
      const update = { authorizationToken: authorizationToken };
      let bankAuth = await BankAuth.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true
      });
  
      await AuthSession.deleteOne({ state });
  
      //TODO: Below path needs to change when standalone app launched. Change to app.json schema in frontend
      console.log(authorizationToken)
      res.redirect('exp://192.168.1.126:19000/--/home'); 
    } catch (error) {
      return serverError(res, error.message);
    }
  };
  
  module.exports = handleBankCallback;