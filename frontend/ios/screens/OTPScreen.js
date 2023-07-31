import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { sendInstantPayment } from '../api/apiClient';

const OTPScreen = ({ route, navigation }) => {
  const { name, amount, targetIban } = route.params;
  const otpRefs = Array(6).fill().map(() => useRef(null));
  const [otp, setOTP] = useState(Array(6).fill(''));

  const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    if (value !== '' && index < otp.length - 1) {
      otpRefs[index + 1].current.focus();
    }
    setOTP(newOTP);
  }

  const handleSubmit = async () => {
    try {
      const otpValue = otp.join('');
      console.log(otpValue)
      const response = await sendInstantPayment(otpValue, amount, name, targetIban);
      console.log(response);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={value => handleOTPChange(value, index)}
            ref={otpRefs[index]} 
            value={digit}
          />
        ))}
      </View>
      {otp.every(digit => digit !== '') &&
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1F',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    width: '15%',
  },
  submitButton: {
    backgroundColor: '#3CB371',
    borderRadius: 5,
    padding: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OTPScreen;
