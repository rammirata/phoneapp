const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');
const router = express.Router();
const { header, query } = require("express-validator");


router.get('/redirect',
  header('authentication').exists().withMessage('Unauthorized: No authentication header'),
  query('bank').exists().withMessage('No bank provided'),
  middleware.validateParams,
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.config.findBankConfig,
  middleware.auth.generateCode,
  controllers.auth.redirectToBankAuth
);

router.get('/callback',
  middleware.config.findBankConfig,
  controllers.auth.handleBankCallback
);


module.exports = router;