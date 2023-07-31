import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { getRequestedPayments } from '../api/apiClient';
import BackButton from '../components/BackButton';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getRequestedPayments();
        // Create a new array from the object, excluding the 'message' key
        const notificationsArray = Object.keys(response).reduce((arr, key) => {
          if (key !== 'message') {
            arr.push(response[key]);
          }
          return arr;
        }, []);
        setNotifications(notificationsArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Amount: {item.amount}</Text>
      <Text style={styles.itemText}>Status: {item.status}</Text>
      <Text style={styles.itemText}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1F',
    paddingTop: 50, // Add some padding to lower the whole screen
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Add some margin at the bottom for spacing
  },
  itemContainer: {
    backgroundColor: '#3CB371',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default NotificationScreen;
