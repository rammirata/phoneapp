const instantPayment = require('./instantPayment');
const accountBalances = require('./accountBalances');
const accountTransactions = require('./accountTransactions');
const syncAccounts = require('./syncAccounts');
const getTargetIban = require('./getTargetIban');
const createPaymentRequest = require('./createPaymentRequest');
const getPaymentRequests = require('./getPaymentRequests');
const updatePaymentRequest = require('./updatePaymentRequest');

module.exports = {
    instantPayment,
    accountBalances,
    accountTransactions,
    syncAccounts,
    getTargetIban,
    createPaymentRequest,
    getPaymentRequests,
    updatePaymentRequest
};