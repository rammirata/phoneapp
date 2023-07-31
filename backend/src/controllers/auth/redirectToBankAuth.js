const querystring = require('querystring');
const AuthSession = require('../../models/AuthSession.model');
const {serverError} = require('../../utils/response')

const redirectToBankAuth = async (req, res, next) => {
  const { codeChallenge, bankConfig, state, codeVerifier, user } = req.$scope;
  const userId = user._id
  const bankName = req.query.bank

  const authSession = new AuthSession({ state, codeVerifier, bankName, userId });
  await authSession.save();

  try {
    const queryParams = {
      response_type: 'code',
      client_id: bankConfig.clientId,
      redirect_uri: bankConfig.redirectUri,
      scope: bankConfig.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: state,
    };

    const queryString = querystring.stringify(queryParams);
    res.send(`${bankConfig.auth.authorizationUrl}?${queryString}`);
  } catch (error) {
    return serverError(res, error.message);
  }
};

module.exports = redirectToBankAuth;