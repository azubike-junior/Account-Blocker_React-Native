import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { http, baseUrl, dataSlice } from '../helpers';
import Toast from 'react-native-toast-message';

const initialState = {
  error: '',
  loading: false,
  error2: '',
  data: '',
  isSuccessful: false,
};

export const validateAccountNumber = createAsyncThunk('nameEnquiry', async (accountNumber) => {
  console.log("<<<<<>>>>", accountNumber)
  try {
    const response = await http(`${baseUrl}/block/getAccountName`, { accountNumber }, 'POST');
    console.log("<<<>>>>>>response", response)
    if (response.statusCode == '00') {
      return response.accountName;
    }
    if (response.statusCode == '96') {
      Toast.show({ type: 'error', text1: 'Invalid Account Number' });
      return null;
    }
  } catch (e) {
    return e.response.data;
  }
});
const validateAccount = dataSlice('validateAccount', initialState, {}, validateAccountNumber);

export default validateAccount.reducer;
