import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TouchableIcon = ({ onPress, name, size, color, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

export default TouchableIcon;