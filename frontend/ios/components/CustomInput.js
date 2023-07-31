import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({ placeholder, iconName, secureTextEntry = false, value, setValue }) => {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={<Icon name={iconName} size={24} color="#fff" />}
      placeholderTextColor="#fff"
      inputStyle={{ color: '#fff' }}
      onChangeText={(value) => setValue(value)}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomInput;