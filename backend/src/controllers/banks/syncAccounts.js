const axios = require('axios');
const {handleAPIError} = require("../../utils/error");
const {success} = require('../../utils/response')
const UserBank = require('../../models/UserBank.model');

const syncAccounts = async (req, res, next) => {
    const {actionConfig, authorizationToken, user} = req.$scope
    const {bank} = req.query
    const userId = user.id
    
    try {
      const response = await axios({
        method: 'get',
        url: actionConfig.url,
        headers: {
          'Authorization': `Bearer ${authorizationToken}`
        }
      });
  
      const accounts = response.data.accounts
      const userBankAccounts = await UserBank.find({ userId: userId, bankName:bank });
  
          // Check for new accounts and add them in userBanks table
          for (let account of accounts) {
            const accountExists = userBankAccounts.some(userBankAccount => userBankAccount.iban === account.iban);
            if (!accountExists) {
              const newUserBank = new UserBank({
                userId: userId,
                bankName: bank,
                BIC: account.bic,
                iban: account.iban,
                accountType: account.accountType,
              });
              await newUserBank.save();
            }
          }
  
      return success(res, message='Succesfully synced accounts', response.data);
  
    } catch (error) {
      return handleAPIError(res, error);
    }
  }

  module.exports = syncAccounts;