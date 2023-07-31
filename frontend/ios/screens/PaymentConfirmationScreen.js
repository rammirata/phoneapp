import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as QueryString from 'query-string';
import { sendInstantPayment } from '../api/apiClient'; 

const PaymentConfirmationScreen = ({ route }) => {
    const [amount, setAmount] = useState(route.params?.amount || '');
    const [name, setName] = useState(route.params?.name || '');
    const navigation = useNavigation();
    const currentDate = new Date();
  
    useEffect(() => {
       
        const handleDeepLink = async (url) => {
          console.log("URL: ", url);
          let params = QueryString.parseUrl(url).query;
          console.log("Parsed Params: ", params);
          if (params) {
            const response = await sendInstantPayment('878853', params.amount, params.targetName, params.targetIban);
            console.log(response)
            setAmount(params.amount);
            setName(params.targetName);
          }
        };

        Linking.getInitialURL().then((url) => {
          if (url) handleDeepLink(url);
        });
      
        const handleUrlChange = (event) => {
          handleDeepLink(event.url);
        };
      
        const subscription = Linking.addListener('url', handleUrlChange);
      
        return () => {

          subscription.remove();
          setAmount('');
          setName('');
        };
    }, []); 
      

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Icon name="checkmark-circle-outline" size={100} color="#3CB371" style={styles.icon} />
        <Title style={styles.title}>Payment Successful!</Title>
        <Text style={styles.date}>{currentDate.toLocaleDateString()}</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardItem}>
            <Title style={styles.cardTitleLeft}>Amount</Title>
            <Title style={styles.cardTitleCenter}>€{amount}</Title>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardItem}>
            <Title style={styles.cardTitleLeft}>To</Title>
            <Paragraph style={styles.cardTextCenter}>{name}</Paragraph>
          </View>
        </Card.Content>
      </Card>
      <Button 
        style={styles.button} 
        contentStyle={styles.buttonContent}
        mode="contained" 
        onPress={() => navigation.navigate('Home')}
      >
        Close
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1F',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 120,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  date: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#3CB371',
    marginBottom: 30,
  },
  cardItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleLeft: {
    color: '#FFFFFF',
    textAlign: 'left',
    width: '100%',
  },
  cardTitleCenter: {
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },
  cardTextCenter: {
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    fontSize: 18, // Increase font size here
  },
  divider: {
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'stretch',
  },
  buttonContent: {
    height: 60,
  },
});

export default PaymentConfirmationScreen;