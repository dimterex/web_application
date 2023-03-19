import { GridRowId } from "@mui/x-data-grid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokens, setTokens, addNewToken, removeTokens } from "../../../api/configuration/tokensApi";
import { NotificationService } from "../../../common/notification/notificationService";
import { TokenModel } from "./tokenModel";

import { TokensConfigurationState } from "./tokensConfigurationState";

const initialState: TokensConfigurationState = {
  tokens: [],
  token_state: 'loading',
};

const SLICE_NAME = "tokensConfiguration";

export const getTokensAsync = createAsyncThunk('configuration/getTokensAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getTokens();
    if (response.status == 'ok') {
      return response.tokens;
    }
    return rejectWithValue(response.exception)
  }
);

export const setTokensAsync = createAsyncThunk('configuration/setTokensAsync', 
  async (tokens: TokenModel[], { rejectWithValue }) => {
    const response = await setTokens(tokens);
    if (response.status == 'ok') {
      return response.message;
    }
    return rejectWithValue(response.message)
  }
);

export const addNewTokenAsync = createAsyncThunk(`${SLICE_NAME}/addNewTokenAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await addNewToken();
        if (response.status == 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
    }
);

export const removeTokensAsync = createAsyncThunk(`${SLICE_NAME}/removeTokensAsync`, 
    async (ids: GridRowId[], { rejectWithValue }) => {
        var id_numbers = ids.map((x) => {
            return x as number
        });
        const response = await removeTokens(id_numbers);
        if (response.status == 'ok') {
            return {
                message: response.message,
                ids: id_numbers,
            };
        }
        return rejectWithValue(response.message)
    }
);

export const tokensConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      
      update_token: (state, action: PayloadAction<TokenModel>) => {
        var token = state.tokens.find(t => t.id == action.payload.id);
        if (token) {
          token.name = action.payload.name;
          token.key = action.payload.key;
        } else {
          state.tokens = [...state.tokens, action.payload]
        }
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(getTokensAsync.pending, (state, action) => {
        state.token_state = 'loading'
      })
      .addCase(getTokensAsync.fulfilled, (state, action) => {
        state.token_state = 'idle'
        state.tokens = action.payload.map(model => ({ id: model.id, name: model.name, key: model.key }));
      })
      .addCase(getTokensAsync.rejected, (state, action) => {
        state.token_state = 'idle';
        NotificationService.raise_error(null, action.payload as string);
      })

      .addCase(setTokensAsync.pending, (state, action) => {
      })
      .addCase(setTokensAsync.fulfilled, (state, action) => {
        NotificationService.raise_success(null, action.payload as string);
      })
      .addCase(setTokensAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      })

        .addCase(addNewTokenAsync.pending, (state, action) => {

        })
        .addCase(addNewTokenAsync.fulfilled, (state, action) => {
            var id = parseInt(action.payload)
            const payload: TokenModel =  { id: id, name:'', key: '' };
            state.tokens = [ ...state.tokens, payload ]
        })
        .addCase(addNewTokenAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(removeTokensAsync.pending, (state, action) => {
        })
        .addCase(removeTokensAsync.fulfilled, (state, action) => {
            const new_states = state.tokens.filter(x => !action.payload.ids.includes(x.id))
            state.tokens = new_states
        })
        .addCase(removeTokensAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })
    },
  });
  
  export const { 
    update_token,
  } = tokensConfigurationSlice.actions;

  export default tokensConfigurationSlice.reducer;