import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTransactions, getBalances } from '../api/apiClient';
import { shortenString } from '../utils/text';
import { formatDate } from '../utils/dates'
import { formatAmount } from '../utils/amount';
import TouchableIcon from '../components/TouchableIcon';


const HomeScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); 
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const openSendMoneyScreen = () => {
    navigation.navigate('SendPayment', { screenTitle: 'Send Money' });
  };

  const openRequestMoneyScreen = () => {
    navigation.navigate('SendPayment', { screenTitle: 'Request Money' });
  };
  

  const fetchData = async () => {
    try {
      const response = await getTransactions({
        bank: 'deutscheBank',
        action: 'accountTransactions',
      });

      const transactionsReversed = response.transactions.reverse()
  
      const transactionsByDate = transactionsReversed.reduce((acc, transaction) => {
        (acc[transaction.bookingDate] = acc[transaction.bookingDate] || []).push(transaction);
        return acc;
      }, {});
  
      const sections = Object.keys(transactionsByDate).map(date => ({
        title: formatDate(date), 
        data: [transactionsByDate[date]] 
      }));
            
      setTransactions(sections);
  
    } catch (error) {
      console.error('Error during get request:', error.message);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await getBalances({
        bank: 'deutscheBank',
        action: 'accountBalances'
      });
      setBalance(response.accounts[0].currentBalance);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBalance(); 
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchData(), fetchBalance()]) 
      .then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.iconContainer}>
        <TouchableIcon name="business-outline" size={24} color="#fff" onPress={() => {/* Insights function */}} />
        <TouchableIcon name="notifications-outline" size={24} color="#fff" onPress={() => navigation.navigate('Notifications')} />
        <TouchableIcon name="person-outline" size={24} color="#fff" onPress={() => {/* Notifications function */}} />
        </View>
      </View>
      <Text style={styles.balance}>{`€${balance}`}</Text>
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
        <TouchableIcon style={styles.button} name="send" size={40} color="#4caf50" onPress={openSendMoneyScreen} />
          <Text style={styles.buttonText}>Send</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableIcon style={styles.button} name="download" size={40} color="#2196f3" onPress={openRequestMoneyScreen} />
          <Text style={styles.buttonText}>Receive</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableIcon style={styles.button} name="search-outline" size={40} color="#fff" onPress={() => {/* Search function */}} />
          <Text style={styles.buttonText}>Search</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableIcon style={styles.button} name="analytics-outline" size={40} color="#f57c00" onPress={() => {/* Insights function */}} />
          <Text style={styles.buttonText}>Insights</Text>
        </View>
      </View>
      <SectionList
        sections={transactions}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            {item.map((transaction, index, array) => (
              <React.Fragment key={transaction.id}>
                <View style={styles.transactionCard}>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTextCounterparty}>{shortenString(transaction.counterPartyName, 30)}</Text>
                    <Text style={styles.transactionTextAmount}>{formatAmount(transaction.amount)}</Text>
                  </View>
                </View>
                {index !== array.length - 1 && <View style={styles.line} />}
              </React.Fragment>
            ))}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212121',
    paddingTop: 65,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
  balance: {
    fontSize: 45,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  balanceLabel: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: 20,
    paddingLeft: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionContainer: {
    backgroundColor: '#424242',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
  },
  buttonText: {
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  sectionHeaderContainer: {
    backgroundColor: '#212121', 
    padding: 5,
  },  
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5, 
    marginBottom: 3,  
  },
  transactionCard: {
    borderBottomColor: '#999',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  transactionDetails: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10,
  },
  line: {
    height: 1, 
    width: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)',  
    alignSelf: 'center', 
  },
  transactionTextCounterparty: {
    color: '#fff',
    fontSize: 13,
  },
  transactionTextAmount: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;
