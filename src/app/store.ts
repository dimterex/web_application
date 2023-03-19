import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configurationSlice from "../components/configuration_tab/configuration/configurationSlice";
import credentialsConfigurationSlice from "../components/configuration_tab/credentials/credentialsConfigurationSlice";
import dockerSlice from "../components/main_tab/docker/dockerSlice";
import meetingsConfigurationSlice from "../components/configuration_tab/meeting_categories/meetingsConfigurationSlice";
import periodicalTasksConfigurationSlice from "../components/configuration_tab/periodical_tasks/periodicalTasksConfigurationSlice";
import syncHistorySlice from "../components/configuration_tab/syncHistory/syncHistorySlice";
import tasksConfigurationSlice from "../components/configuration_tab/task_categories/tasksConfigurationSlice";
import tokensConfigurationSlice from "../components/configuration_tab/tokens/tokensConfigurationSlice";
import urlsConfigurationSlice from "../components/configuration_tab/urls/urlsConfigurationSlice";
import meetingsSlice from "../components/main_tab/meeting/meetingsSlice";
import worklogSlice from "../components/main_tab/worklog/worklogSlice";

export const store = configureStore({
  reducer: {
    meetings: meetingsSlice,
    worklog: worklogSlice,
    configuration: configurationSlice,
    dockerSlice: dockerSlice,
    meetings_configration: meetingsConfigurationSlice,
    tasks_configration: tasksConfigurationSlice,
    tokens_configuration: tokensConfigurationSlice,
    urls_configuration: urlsConfigurationSlice,
    periodical_tasks_configuration: periodicalTasksConfigurationSlice,
    credentials_configuration: credentialsConfigurationSlice,
    syncHistory: syncHistorySlice
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
