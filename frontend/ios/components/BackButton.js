import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name='arrow-back'
          type='material'
          color='white'
          onPress={() => navigation.goBack()}
        />
    </TouchableOpacity>
  );
};


export default BackButton;