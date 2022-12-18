import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import configurationSlice from '../components/configuration/configurationSlice';
import loggerSlice from '../components/logger/loggerSlice';
import meetingsReducer from '../components/meeting/meetingsSlice';
import worklogReducer from '../components/worklog/worklogSlice';

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer,
    worklog: worklogReducer,
    logger: loggerSlice,
    configuration: configurationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
