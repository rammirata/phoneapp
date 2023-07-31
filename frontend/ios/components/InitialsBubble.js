import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colors = {
  lightgreen: 'rgba(144, 238, 144, 0.5)',
  limegreen: 'rgba(50, 205, 50, 0.5)',
  mediumspringgreen: 'rgba(0, 250, 154, 0.5)',
  deepskyblue: 'rgba(0, 191, 255, 0.5)',
  dodgerblue: 'rgba(30, 144, 255, 0.5)',
  royalblue: 'rgba(65, 105, 225, 0.5)',
  mediumslateblue: 'rgba(123, 104, 238, 0.5)',
  lightsteelblue: 'rgba(176, 224, 230, 0.5)',
  lightslategray: 'rgba(119, 136, 153, 0.5)',
  gray: 'rgba(128, 128, 128, 0.5)',
  dimgray: 'rgba(105, 105, 105, 0.5)',
  black: 'rgba(0, 0, 0, 0.5)',
};

const InitialsBubble = ({ initials }) => {
  const colorKey = useMemo(() => {
    const charCode = initials[0].toUpperCase().charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) { // A-Z
      const index = Math.floor((charCode - 65) / 2);
      const keys = Object.keys(colors);
      return keys[index] || keys[keys.length - 1];
    } else {
      const keys = Object.keys(colors);
      return keys[keys.length - 1]; // Other characters
    }
  }, [initials]);

  return (
    <View style={{ ...styles.bubble, backgroundColor: colors[colorKey] }}>
      <Text style={{ ...styles.text, color: colors[colorKey].replace('0.5', '1')}}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

export default InitialsBubble;
