import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const baseUrl = `https://ab5a-197-253-42-52.eu.ngrok.io`;

export const http = async (url, data, method) => {
  const response = await fetch(url, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'yes',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data ? JSON.stringify(data) : null,
  });
  return response.json();
};

export const dataSlice = (name, initialState, reducers, api) => {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(api.rejected, (state, action) => {
        state.error = action.payload;
        state.error2 = action.error.name;
        state.loading = false;
        state.isSuccessful = false;
      });
      builder.addCase(api.fulfilled, (state, action) => {
        state.loading = true;
        state.data = action.payload;
        state.loading = false;
        state.isSuccessful = true;
        state.error = '';
      });
      builder.addCase(api.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
    },
  });
};
