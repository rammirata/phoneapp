import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { getLatestUnique } from '../utils/transactions'
import { formatAmount } from '../utils/amount'
import { formatDate } from '../utils/dates'
import { getTransactions, getTargetUser } from '../api/apiClient';
import { useDebounce } from '../utils/useDebounce';
import { createInitials } from '../utils/text'; 
import InitialsBubble from '../components/InitialsBubble'
import BackButton from '../components/BackButton';


const PaymentScreen = ({ navigation, route }) => {
  const { screenTitle } = route.params;
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      getTargetUser(debouncedSearch) 
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUser(null);
    }
  }, [debouncedSearch]);

  const fetchData = async () => {
    try {
      const response = await getTransactions({
        bank: 'deutscheBank',
        action: 'accountTransactions',
      });

      const transactionsReversed = response.transactions
      const transactionsLatestUnique = getLatestUnique(transactionsReversed)

      setTransactions(transactionsLatestUnique);

    } catch (error) {
      console.error('Error during get request:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.bubbleWrapper}>
        <InitialsBubble initials={createInitials(item.counterPartyName)} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.counterPartyName}</Text>
        <Text style={styles.itemSubtext}>You paid {formatAmount(item.amount)}</Text>
      </View>
      <View>
        <Text style={styles.itemDate}>{formatDate(item.bookingDate)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topBar}>
        <BackButton />
        <View style={styles.rightIcons}>
          <Icon
            name='account-balance'
            type='material'
            color='white'
          />
          <Icon
            name='qrcode'
            type='font-awesome'
            color='white'
            onPress={() => navigation.navigate('ScanQR', { 
              onScan: (data) => {
                console.log(data)
                navigation.navigate('OTP', { amount: data.amount, name: data.targetName, targetIban: data.targetIban}); 
              }
            })}
          />
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{screenTitle}</Text>
      </View>
      <View style={styles.searchBar}>
        <Input
          placeholder="email, name"
          placeholderTextColor="#808080"
          placeholderStyle={{ fontWeight: '80' }}
          leftIcon={{ type: 'material', name: 'search', color: '#808080' }}
          onChangeText={value => setSearch(value)}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIconContainerStyle={styles.iconContainer}
          underlineColorAndroid="transparent"
        />
      </View>
      {user && (
        <TouchableOpacity onPress={() => navigation.navigate('WriteAmount', { user: user, action: screenTitle })}>
          <View style={styles.userContainer}>
            <InitialsBubble initials={createInitials(user.name)} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      {!user && (
        <>
          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>Recent</Text>
          </View>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1F',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  rightIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleText: {
    fontSize: 26,
    color: 'white',
    fontWeight:'bold'
  },
  searchBar: {
    paddingTop: 20,
    paddingHorizontal: 5
  },
  subTitle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  subTitleText: {
    fontSize: 20,
    color: 'white',
    fontWeight:'bold'
  },
  inputContainer: {
    borderRadius: 15,
    backgroundColor: '#282828',
    borderBottomWidth: 0,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    color: '#FFFFFF',
  },
  iconContainer: {
    paddingLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    alignItems: 'center', 
  },
  bubbleWrapper: {
    marginRight: 10, 
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  itemSubtext: {
    color: '#808080',
    fontSize: 12,
    marginTop: 5, // Creates a gap between the name and "you paid" text
  },
  itemDate: {
    color: '#808080',
    fontSize: 14,
  },
});

export default PaymentScreen;
