const { randomString, generateCodeChallenge } = require("../utils/crypto");
const axios = require('axios');
const {handleAPIError} = require("../utils/error");
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const User = require('../models/users.model');
const BankAuth = require('../models/BankAuth.model');
const {badRequest, serverError} = require('../utils/response')

const generateCode = async (req, res, next) => {
  try {
    const codeVerifier = randomString();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = crypto.randomBytes(20).toString('hex');

    req.$scope.codeVerifier = codeVerifier;
    req.$scope.codeChallenge = codeChallenge;
    req.$scope.state = state;

    next();
  } catch (error) {
    return serverError(res, error.message);
  }
};


const checkAuthenticationToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authentication'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, 'your_secret_key', async (err, decodedToken) => {
      if (err) {
        return badRequest(res, message='Forbidden');
      } else {
        req.$scope.decodedToken = decodedToken;

        next();
      }
    });
  } catch (error) {
    return serverError(res, message='Unknown server error while verifying jwt token');
  }
};

const checkAuthorizationToken = async (req, res, next) => {
  try {
    const userId = req.$scope.user._id;
    const bankAuth = await BankAuth.findOne({ userId: userId });
    if (!bankAuth) {
      return res.status(401).json({ error: 'Unauthorized: No authorization token found for user' });
    }
    req.$scope.authorizationToken = bankAuth.authorizationToken;
    req.$scope.bankAuth = bankAuth
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while checking authorization token' });
  }
}

const createOtpChallenge = async (req, res, next) => {
  const { bankConfig, actionConfig, authorizationToken } = req.$scope;

  try {
    const response = await axios.post(bankConfig.auth.otpUrl, {
      method: 'MTAN',
      requestType: actionConfig.type,
      requestData: {
        type: actionConfig.otpType,
        targetIban: req.body.creditorAccount.iban,
        amountCurrency: req.body.creditorAccount.currencyCode,
        amountValue: parseInt(req.body.instructedAmount.amount, 10)
      },
      language: 'de'
    }, {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`,
        'Accept': 'application/json'
      }
    });



    req.$scope.challengeId = response.data.id;
  
    next();
  } catch (error) {
    return handleAPIError(res, error);
  }
}

const confirmOtpChallenge = async (req, res, next) => {
  const { authorizationToken, challengeId, bankConfig } = req.$scope;
  const otp = req.body.otp;

  try {
    const response = await axios.patch(`${bankConfig.auth.otpUrl}/${challengeId}`, {
      challengeResponse: otp
    }, {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json'
      }
    });

    req.$scope.proofToken = response.data.challengeProofToken;
    
    next();
  } catch (error) {
    return handleAPIError(res, error);
  }
}

module.exports = {
  generateCode,
  checkAuthorizationToken,
  createOtpChallenge,
  confirmOtpChallenge,
  checkAuthenticationToken
};