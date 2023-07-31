import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput } from 'react-native';
import InitialsBubble from '../components/InitialsBubble';
import BackButton from '../components/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTargetIban, requestPayment } from '../api/apiClient';
import { sendInstantPayment } from '../api/apiClient';



const WriteAmountScreen = ({ route, navigation }) => {
  const { user, action } = route.params;
  const [amount, setAmount] = useState('0');
  const [targetIban, setTargetIban] = useState('');

  const initials = user.name.split(' ').slice(0,2).map(namePart => namePart[0]).join('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchTargetIban = async () => {
      try {
        const response = await getTargetIban(user.username);
        setTargetIban(response.iban);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTargetIban();
  }, []);

  const handleSend = async () => {
    //navigation.navigate('OTP', { amount: amount, name: user.name, targetIban: targetIban });
    try {
      const otpValue = '829106'
      const name = user.name
      const response = await sendInstantPayment(otpValue, amount, name, targetIban);
      console.log(response);
      navigation.navigate('PaymentConfirmation', {amount: amount, name: name});
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRequest = async () => {
    try {
      const message = await requestPayment(user.username, amount );
      console.log(message);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BackButton />
      </View>
      <View style={styles.userContainer}>
        <Icon name="arrow-forward-outline" size={40} color="#FFFFFF" style={styles.arrowIcon} />
        <InitialsBubble initials={initials} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <TextInput
        ref={inputRef}
        style={styles.amountInput}
        keyboardType="number-pad"
        value={`€${amount}`}
        onChangeText={(val) => setAmount(val.replace(/[^0-9]/g, ''))}
        placeholderTextColor="#808080"
      />
      <TouchableHighlight
        style={styles.button}
        onPress={action === 'Send Money' ? handleSend : handleRequest}
        underlayColor="#2E8B57"
      >
        <Text style={styles.buttonText}>{action === "Send Money" ? "Send" : "Request"}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1F',
    justifyContent: 'flex-start', 
    padding: 20,
    paddingTop: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 130, 
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, 
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
  },
  arrowIcon: {
    marginRight: 10,
  },
  amountInput: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#3CB371',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WriteAmountScreen;
