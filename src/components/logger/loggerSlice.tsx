import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NotificationService } from "../notification/notificationService";
import { LoggerState } from "./interfaces/loggerState";
import { getLogHistoryForSource, getLogSources } from "./loggerApi";


const initialState: LoggerState = {
    sources: [],
    selected_source: '',
    loaded_events: []
};


export const getLogSourcesAsync = createAsyncThunk('logger/getLogSourcesAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getLogSources();
    if (response.status == 'ok') {
      return response.sources;
    }
    return rejectWithValue(response.exception)
  }
);

export const getLogHistoryForSourceAsync = createAsyncThunk('logger/getLogHistoryForSourceAsync', 
    async ({source, count} : {source: string, count: number}, { rejectWithValue }) => {
    const response = await getLogHistoryForSource(source, count);
    if (response.status == 'ok') {
      return response.messages;
    }
    return rejectWithValue(response.exception)
  }
);

export const loggerSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        change_selected_source: (state, action: PayloadAction<string>) => {
            state.selected_source = action.payload;
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getLogSourcesAsync.fulfilled, (state, action) => {
          state.sources = action.payload ?? [];
        })
        .addCase(getLogSourcesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(getLogHistoryForSourceAsync.fulfilled, (state, action) => {
          state.loaded_events = action.payload ?? [];
        })
        .addCase(getLogHistoryForSourceAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        });
    },
  });
  
  export const { change_selected_source } = loggerSlice.actions;

  export const selectLogSources = (state: RootState) => state.logger.sources;
  export const selectSelectedSource = (state: RootState) => state.logger.selected_source;
  export const selectLoadedEventsSource = (state: RootState) => state.logger.loaded_events;
  
  
  export default loggerSlice.reducer;