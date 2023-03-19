import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { WorklogState } from './interfaces/worklogState';
import { getHistoryWorklogByDate, getMonthStatistics, setWorklogByDate } from '../../api/statistics/worklogApi';

import { Store } from 'react-notifications-component';
import { NotificationService } from '../notification/notificationService';

const initialState: WorklogState = {
  events: [],
  history_message: null,
};


export const getMonthStatisticsAsync = createAsyncThunk('worklog/getMeetingsByDateAsync', 
  async ({ day, force = false }: { day: moment.Moment, force: boolean }, { rejectWithValue }) => {
    const response = await getMonthStatistics(day, force);
    if (response.status == 'ok') {
      return response.messages;
    }
    return rejectWithValue(response.exception)
  }
);

export const setWorklogByDateAsync = createAsyncThunk('worklog/setWorklogByDateAsync', 
  async (day: moment.Moment, { rejectWithValue }) => {
    const response = await setWorklogByDate(day);
    
    if (response.status == 'ok') {
      const statistics = await getMonthStatistics(day, true);

      if (statistics.status == 'ok') {
        return {
          response: response.message,
          statistics: statistics.messages,
        };
      }

      return rejectWithValue(statistics.exception)
    }
    return rejectWithValue(response.exception)
  }
);

export const getHistoryWorklogByDateAsync = createAsyncThunk('worklog/getHistoryWorklogByDateAsync', 
  async (day: moment.Moment, { rejectWithValue }) => {
    const response = await getHistoryWorklogByDate(day);
    if (response.status == 'ok') {
      return response.messages;
    }
    return rejectWithValue(response.exception)
  }
);

export const worklogSlice = createSlice({
  name: 'worklog',
  initialState,
  reducers: {
    clear_worklog_message: (state, action: PayloadAction) => {
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMonthStatisticsAsync.fulfilled, (state, action) => {
        state.events = action.payload ?? [];
      })
      .addCase(getMonthStatisticsAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      })

      .addCase(setWorklogByDateAsync.fulfilled, (state, action) => {
        state.events = action.payload.statistics ?? [];
        NotificationService.raise_success(null, action.payload.response as string);
      })
      .addCase(setWorklogByDateAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      })

      .addCase(getHistoryWorklogByDateAsync.fulfilled, (state, action) => {
        state.history_message = action.payload;
      })
      .addCase(getHistoryWorklogByDateAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      })        
  },
});

export const selectHistoryWorklogResultState = (state: RootState) => state.worklog.history_message;
export const selectWorklogResultState = (state: RootState) => state.worklog.events;

export const {clear_worklog_message} = worklogSlice.actions;


export default worklogSlice.reducer;

export const SUCCESS_WORKLOG_TIME = 7;
