import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BankPicker = ({ selectedValue, onValueChange, banks = ['Deutsche Bank', 'UBS', 'ING'] }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBankSelect = (bank) => {
    setSearchValue(bank);  // Update the searchValue state with the selected bank
    onValueChange(bank);
    setShowDropdown(false); // Close dropdown here
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = banks.filter((bank) =>
      bank.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBanks(filtered);
    setShowDropdown(value.length > 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <MaterialCommunityIcons name="bank" size={24} color="#fff" />
        <TextInput
          style={styles.input}
          placeholder="Choose you Bank"
          placeholderTextColor="#fff"
          value={searchValue}
          onChangeText={handleSearch}
          onFocus={() => setShowDropdown(searchValue.length > 0)}
        />
        <IconButton
          icon={showDropdown ? 'chevron-up' : 'chevron-down'}
          color="#fff"
          onPress={() => setShowDropdown(!showDropdown)}
        />
      </View>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item}
            onScrollBeginDrag={Keyboard.dismiss}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleBankSelect(item)}>
                <View style={styles.bankItem}>
                  <Text style={styles.bankItemText}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#fff', 
    marginLeft: 8,
  },
  dropdownContainer: {
    marginTop: 8,
    width: '100%',
    backgroundColor: '#424242',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  bankItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', 
  },
  bankItemText: {
    fontSize: 16,
    color: '#fff', 
  },
});

export default BankPicker;
