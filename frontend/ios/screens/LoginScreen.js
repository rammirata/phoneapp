import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/apiClient';
import CustomInput from '../components/CustomInput';


const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(identifier, password);
      const jwtToken = response.token;
      await AsyncStorage.setItem('@jwtToken', jwtToken);
      navigation.navigate('FirstScreen');
    } catch (error) {
      console.log('Error during login:', error.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_white.png')} style={styles.logo} />
      </View>
      <CustomInput 
        placeholder='Username'
        iconName='person-outline'
        value={identifier}
        setValue={setIdentifier}
      />
      <CustomInput 
        placeholder='Password'
        iconName='lock-closed-outline'
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <Button title='Login' onPress={handleLogin} buttonStyle={styles.button} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#212121',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#4caf50',
    marginTop: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    fontSize: 16,
    color: '#fff',
  },
  registerLink: {
    fontSize: 16,
    color: '#4caf50',
  },
});

export default LoginScreen;
