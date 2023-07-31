import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { register } from '../api/apiClient';
import CustomInput from '../components/CustomInput';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(''); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(name, username, email, password); 
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error during registration:', error.message);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_white.png')} style={styles.logo} />
      </View>
      <CustomInput 
        placeholder='Name'
        iconName='person-outline'
        value={name}
        setValue={setName}
      />
      <CustomInput 
        placeholder='Username'
        iconName='person-outline'
        value={username}
        setValue={setUsername}
      />
      <CustomInput 
        placeholder='Email'
        iconName='mail-outline'
        value={email}
        setValue={setEmail}
      />
      <CustomInput 
        placeholder='Password'
        iconName='lock-closed-outline'
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <Button title='Register' onPress={handleRegister} buttonStyle={styles.button} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginLink}>Log in</Text>
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
  },
  loginLink: {
    fontSize: 16,
    color: '#4caf50',
  },
});

export default RegisterScreen;
