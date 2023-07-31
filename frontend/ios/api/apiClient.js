import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: 'http://192.168.1.126:3000',
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@jwtToken');
    if (token) {
      config.headers.Authentication = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data) {
      error.message = error.response.data.message;
    } else if (error.request) {
      error.message = 'No response received from server';
    } else {
      error.message = 'Error setting up request';
    }
    return Promise.reject(error);
  }
);

export const register = async (name, username, email, password) => {
  const response = await client.post('/users/register', {
    name: name,
    username: username,
    email: email,
    password: password,
  });
  return response.data;
};

export const login = async (identifier, password) => {
  const response = await client.post('/users/login', {
    identifier: identifier,
    password: password,
  });
  return response.data;
};

export const redirectAuth = async (bank) => {
  const response = await client.get('/auth/redirect', {
    params: {
      bank,
    },
  });
  return response.data;
};

export const getTargetUser = async (identifier) => {
  const response = await client.get(`/users/get-target-user/${identifier}`);
  return response.data;
};

export const requestPayment = async (identifier, amount) => {
  const response = await client.post(`/banks/payment-requests/${identifier}`, { amount });
  return response.message;
};

export const getRequestedPayments = async (status = null, type = null) => {
  let params = {};
  if (status !== null) params.status = status;
  if (type !== null) params.type = type;

  const response = await client.get('/banks/payment-requests/', { params });
  return response.data;
};

export const getTargetIban = async (identifier) => {
  const response = await client.get(`/banks/get-target-iban/${identifier}`);
  return response.data;
};

export const getTransactions = async (params) => {
  const response = await client.get('/banks/accountTransactions', { params });
  return response.data;
};

export const getBalances = async (params) => {
  const response = await client.get('/banks/accountBalances', { params });
  return response.data;
};

export const sendInstantPayment = async (otp, amount, targetName, targetIban) => {
  console.log(otp)
  const response = await client.post('/banks/instantPayment', {
    otp,
    debtorAccount: {
      iban: "{debtorIban}"
    },
    instructedAmount: {
      amount,
      currencyCode: "EUR"
    },
    creditorName: targetName,
    creditorAccount: {
      currencyCode: "EUR",
      iban: targetIban
    }
  }, {
    params: {
      bank: 'deutscheBank',
      action: 'instantSepaTransfer'
    }
  });

  return response.data;
};
