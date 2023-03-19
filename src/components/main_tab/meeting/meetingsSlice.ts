import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { getMeetingsByDate } from '../../../api/meetings/meetingsApi';
import { MeetingsItem } from '../../../api/meetings/meetingsItem';
import { RootState } from '../../../app/store';
import { NotificationService } from '../../../common/notification/notificationService';

export interface MeetingsByDateState {
  events: MeetingsItem[];
  day: string;
}

const initialState: MeetingsByDateState = {
  events: [],
  day: moment().format('LL'),
};

export const getMeetingsByDateAsync = createAsyncThunk('meetings/getMeetingsByDateAsync', 
    async (day: moment.Moment, { rejectWithValue }) => {
    const response = await getMeetingsByDate(day);
    if (response.status == 'ok') {
      return response.messages;
    }
    return rejectWithValue(response.exception)
  }
);

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    change_selected_day: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
      state.events = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingsByDateAsync.fulfilled, (state, action) => {
        state.events = action.payload ?? [];
      })
      .addCase(getMeetingsByDateAsync.rejected, (state, action) => {
        NotificationService.raise_error(null, action.payload as string);
      });
  },
});

export const { change_selected_day } = meetingsSlice.actions;

export const selectMeetingsState = (state: RootState) => state.meetings.events;
export const selecSelectedDayState = (state: RootState) => state.meetings.day;

export default meetingsSlice.reducer;
