import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCredentials, setCredentials } from "../../api/configuration/credentialsApi";
import { NotificationService } from "../notification/notificationService";


import { CredentialModel } from "./credentialModel";
import { CredentialsConfigurationState } from "./credentialsConfigurationState";

const initialState: CredentialsConfigurationState = {
  state: 'loading',
  login: '',
  password: '',
  email: '',
  domain: '',
};

const SLICE_NAME = "credentialsConfiguration";


export const getCredentialsAsync = createAsyncThunk(`${SLICE_NAME}/getCredentialsAsync`, 
    async (_, { rejectWithValue }) => {
    const response = await getCredentials();
    if (response.status == 'ok') {
      return response.credentials;
    }
    return rejectWithValue(response.exception)
  }
);

export const setCredentionalsAsync = createAsyncThunk(`${SLICE_NAME}/setCredentionalsAsync`, 
  async (credentials: CredentialModel, { rejectWithValue }) => {
    const response = await setCredentials(credentials);
    if (response.status == 'ok') {
      return response.message;
    }
    return rejectWithValue(response.message)
  }
);


export const credentialsConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder

      .addCase(getCredentialsAsync.fulfilled, (state, action) => {
        state.domain = action.payload.domain;
        state.login = action.payload.login;
        state.password = action.payload.password;
        state.email = action.payload.email;
        state.state = 'idle'
      })
      .addCase(getCredentialsAsync.rejected, (state, action) => {
        state.state = 'idle'
        NotificationService.raise_error(null, action.payload as string);
      })
      
      .addCase(setCredentionalsAsync.pending, (state, action) => {
      })
      .addCase(setCredentionalsAsync.fulfilled, (state, action) => {
        NotificationService.raise_success(null, action.payload as string);
      })
      .addCase(setCredentionalsAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      })
    },
  });
  
  export default credentialsConfigurationSlice.reducer;
