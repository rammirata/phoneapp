import React, { useState } from 'react';
import { View, Text, Linking, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import BankPicker from '../components/BankPicker';
import { redirectAuth } from '../api/apiClient';

import logo from '../assets/logo_white.png';

const FirstScreen = () => {
  const [selectedBank, setSelectedBank] = useState('UBS');

  const handleValueChange = async (itemValue) => {
    setSelectedBank(itemValue);

    if (itemValue === 'Deutsche Bank') {
      try {
        const response = await redirectAuth('deutscheBank');
        Linking.openURL(response);
        setSelectedBank('UBS');
      } catch (error) {
        console.log('Error fetching data from backend:', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>Please select your primary bank and enter your credentials</Text>
      </View>
      <BankPicker selectedValue={selectedBank} onValueChange={handleValueChange} style={styles.bankPicker} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 300,
  },
  bankPicker: {
    backgroundColor: '#424242',
    borderRadius: 10,
    marginTop: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default FirstScreen;
