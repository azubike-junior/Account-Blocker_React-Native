import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Image, StyleSheet, ActivityIndicator, Text, View, TextInput } from 'react-native';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { http, baseUrl, dataSlice } from '../helpers';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  error: '',
  loading: false,
  error2: '',
  data: '',
  isSuccessful: false,
};

export const login = createAsyncThunk('login', async (data) => {
  try {
    const { email, password, navigation } = data;
    const response = await http(`${baseUrl}/users/login`, { email, password }, 'POST');

    console.log('>>>>>response', response);

    if (response.statusCode === 200) {
      await AsyncStorage.setItem('@data', JSON.stringify(response?.data));
      navigation.navigate('Blocker');
      return response.data;
    }
    if (response.statusCode === '96') {
      Toast.show({ type: 'error', text1: 'Invalid Login Credentials' });
      return null;
    }
    if (response.data.Status !== 'ACTIVE') {
      Toast.show({ type: 'error', text1: 'Sorry, you are inactive' });
      return null;
    }
  } catch (e) {
    return e.response.data;
  }
});

const loginUser = dataSlice('login', initialState, {}, login);

export default loginUser.reducer;
