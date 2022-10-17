import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http, baseUrl, dataSlice } from '../helpers';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

const initialState = {
  error: '',
  loading: false,
  error2: '',
  data: '',
  isSuccessful: false,
};

export const blockAccount = createAsyncThunk('blockAccount', async (data) => {
  try {
    const { setAccountVisible, inputRef, ...rest } = data;
    const response = await http(`${baseUrl}/block`, rest, 'POST');
    if (response.statusCode === '00') {
      setAccountVisible(false);
      inputRef.current.clear();
      return response.statusCode;
    }
  } catch (e) {
    return e.response.data;
  }
});

const blockAccountNumber = dataSlice('blockAccount', initialState, {}, blockAccount);

export default blockAccountNumber.reducer;
