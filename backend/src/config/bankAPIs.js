module.exports = {
  deutscheBank: {
    clientId: '7284ffcf-8da0-4a26-a3b3-95ab85cfdb2c',
    clientSecret: 'Cv5rGN0abKEcaMOWPkA490ykolfzc8kYGia4DHd2CYbNJnEAXNvqPRp9cy2i-NilG69BrN0oCgKh1IWKE0F0NQ',
    redirectUri: 'http://192.168.1.126:3000/auth/callback',
    scope: 'instant_sepa_credit_transfers verify_account_ownership openid read_additional_personal_data read_customer_data offline_access read_accounts read_transactions read_credit_card_transactions read_assets read_accounts_list read_customer_data',
    auth: {
      otpUrl: 'https://simulator-api.db.com:443/gw/dbapi/others/transactionAuthorization/v1/challenges',
      authorizationUrl: 'https://simulator-api.db.com/gw/oidc/authorize',
      tokenUrl: 'https://simulator-api.db.com/gw/oidc/token',
    },
    instantSepaTransfer: {
      url: 'https://simulator-api.db.com:443/gw/dbapi/paymentInitiation/payments/v1/instantSepaCreditTransfers',
      type: 'INSTANT_SEPA_CREDIT_TRANSFERS',
      otpType: 'challengeRequestDataInstantSepaCreditTransfers'
    },
    accountTransactions: {
      url: 'https://simulator-api.db.com:443/gw/dbapi/banking/transactions/v2',
      sortBy: 'bookingDate[DESC]',
      bookingDateFrom: '2023-03-30',
      limit: 200
    },
    accountBalances: {
      url: 'https://simulator-api.db.com:443/gw/dbapi/banking/cashAccounts/v2'
    },
    syncAccounts: {
      url: 'https://simulator-api.db.com:443/gw/dbapi/banking/cashAccounts/v2'
    }
  }
};