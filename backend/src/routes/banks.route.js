const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');
const { query, param } = require("express-validator");

const router = express.Router();


router.post('/instantPayment',
  query('action').exists().withMessage('Action not provided'),
  query('bank').exists().withMessage('No bank provided'),
  middleware.validateParams,
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.auth.checkAuthorizationToken,
  middleware.config.findBankConfig,
  middleware.config.findActionConfig,
  middleware.banks.getIban(),
  middleware.auth.createOtpChallenge,
  middleware.auth.confirmOtpChallenge,
  controllers.banks.instantPayment
);

router.post('/payment-requests/:identifier',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.users.getTargetUser,
  controllers.banks.createPaymentRequest
);

router.put('/payment-requests/:identifier/:paymentId',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.users.getTargetUser,
  controllers.banks.updatePaymentRequest
);

router.get('/payment-requests',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  controllers.banks.getPaymentRequests
)

router.get('/get-target-iban/:identifier',
  param('identifier').exists().withMessage('Invalid Resource: username or email'),
  middleware.users.getTargetUser,
  controllers.banks.getTargetIban
);

router.get('/accountTransactions',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.auth.checkAuthorizationToken,
  middleware.config.findBankConfig,
  middleware.config.findActionConfig,
  middleware.banks.getIban(),
  controllers.banks.accountTransactions
);

router.get('/accountBalances',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.auth.checkAuthorizationToken,
  middleware.config.findBankConfig,
  middleware.config.findActionConfig,
  controllers.banks.accountBalances
);

router.get('/syncAccounts',
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.auth.checkAuthorizationToken,
  middleware.config.findBankConfig,
  middleware.config.findActionConfig,
  controllers.banks.syncAccounts
);


module.exports = router;
