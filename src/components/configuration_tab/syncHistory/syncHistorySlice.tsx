import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getHistoryRequest } from '../../../api/sync/syncApi';
import { RootState } from '../../../app/store';
import { NotificationService } from '../../../common/notification/notificationService';
import { SyncState } from './interfaces/syncHistoryState';


const initialState: SyncState = {
  events: [],
  state: 'loading',
};


export const getHistoryRequestAsync = createAsyncThunk('sync/getHistoryRequestAsync', 
  async (_, { rejectWithValue }) => {
    const response = await getHistoryRequest();
    if (response.status == 'ok') {
      return response.items;
    }
    return rejectWithValue(response.exception)
  }
);


export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
      clear_worklog_message: (state, action: PayloadAction) => {
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryRequestAsync.fulfilled, (state, action) => {
        state.events = action.payload ?? [];
        state.state = 'idle'
      })
      .addCase(getHistoryRequestAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
        state.state = 'idle'
      })
  },
});

export const selectSyncResultState = (state: RootState) => state.syncHistory.events;

export default syncSlice.reducer;
