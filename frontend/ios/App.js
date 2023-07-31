import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import { Provider as PaperProvider } from 'react-native-paper';


// Import the individual screen components
import ScanQRScreen from './screens/ScanQRScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FirstScreen from './screens/FirstScreen';
import PaymentScreen from './screens/PaymentScreen';
import WriteAmountScreen from './screens/WriteAmountScreen';
import OTPScreen from './screens/OTPScreen';
import NotificationScreen from './screens/NotificationScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: [Linking.createURL('/'), 'myapp://'],
  config: {
    screens: {
      FirstScreen: 'firstScreen',
      Home: 'home',
      Login: 'login',
      PaymentConfirmation: 'paymentConfirmation'
    },
  },
};

function App() {
  return (
    <PaperProvider>
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SendPayment" component={PaymentScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ScanQR" component={ScanQRScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WriteAmount" component={WriteAmountScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;