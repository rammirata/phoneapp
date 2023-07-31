export function getLatestUnique(transactions) {
  
    let uniqueTransactions = new Map();
  
    for (let transaction of transactions) {
        // Use the counterPartyName as the key, this will automatically remove duplicates
        uniqueTransactions.set(transaction.counterPartyName, transaction);
    }
  
    let lastUniqueTransactions = Array.from(uniqueTransactions.values()).slice(-5);
  
    return lastUniqueTransactions;
}
