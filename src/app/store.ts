import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import meetingsReducer from '../components/meeting/meetingsSlice';
import worklogReducer from '../components/worklog/worklogSlice';

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer,
    worklog: worklogReducer,
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
