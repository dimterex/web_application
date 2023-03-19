import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import configurationSlice from '../components/configuration/configurationSlice';
import meetingsReducer from '../components/meeting/meetingsSlice';
import worklogReducer from '../components/worklog/worklogSlice';
import dockerSlice from '../components/docker/dockerSlice';
import urlsConfigurationSlice from '../components/urls/urlsConfigurationSlice';
import credentialsConfigurationSlice from '../components/credentials/credentialsConfigurationSlice';
import meetingsConfigurationSlice from '../components/meeting_categories/meetingsConfigurationSlice';
import periodicalTasksConfigurationSlice from '../components/periodical_tasks/periodicalTasksConfigurationSlice';
import tasksConfigurationSlice from '../components/task_categories/tasksConfigurationSlice';
import tokensConfigurationSlice from '../components/tokens/tokensConfigurationSlice';

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer,
    worklog: worklogReducer,
    configuration: configurationSlice,
    dockerSlice: dockerSlice,
    meetings_configration: meetingsConfigurationSlice,
    tasks_configration: tasksConfigurationSlice,
    tokens_configuration: tokensConfigurationSlice,
    urls_configuration: urlsConfigurationSlice,
    periodical_tasks_configuration: periodicalTasksConfigurationSlice,
    credentials_configuration: credentialsConfigurationSlice,
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
