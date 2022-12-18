import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NotificationService } from "../notification/notificationService";
import { getCredentials, getMeetingCategories, setCredentials, setMeetingCategories } from "./configurationApi";
import { ConfigurationTypes } from "./configurationTypes";
import { ConfigurationState } from "./interfaces/configurationState";
import { MeetingCategory } from "./interfaces/meetingCategory";
import { MeetingCategoryRow } from "./pages/meetingsCategoriesView";
import {v4 as uuidv4} from 'uuid';
import { GridRowId } from "@mui/x-data-grid";
import { CredentialModel } from "./interfaces/credentialModel";


export interface ConfigurationContainerProps {
  types: ['credentials', 'urls', 'outlook_categories', 'todoist_categories', 'tokens'],
}

const initialState: ConfigurationState = {
  credentials: null,
  meetings_categories: [],
  selected_type: ConfigurationTypes.credentials,
  meeting_state: 'loading',
};


export const getCredentialsAsync = createAsyncThunk('configuration/getCredentialsAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getCredentials();
    if (response.status == 'ok') {
      return response.credentials;
    }
    return rejectWithValue(response.exception)
  }
);

export const setCredentionalsAsync = createAsyncThunk('configuration/setCredentionalsAsync', 
  async (credentials: CredentialModel, { rejectWithValue }) => {
    const response = await setCredentials(credentials);
    if (response.status == 'ok') {
      return response.exception;
    }
    return rejectWithValue(response.exception)
  }
);

export const getMeetingCategoriesAsync = createAsyncThunk('configuration/getMeetingCategoriesAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getMeetingCategories();
    if (response.status == 'ok') {
      return response.categories;
    }
    return rejectWithValue(response.exception)
  }
);

export const setMeetingCategoriesAsync = createAsyncThunk('configuration/setMeetingCategoriesAsync', 
  async (categories: MeetingCategory[], { rejectWithValue }) => {
    const response = await setMeetingCategories(categories);
    if (response.status == 'ok') {
      return response.exception;
    }
    return rejectWithValue(response.exception)
  }
);

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
      change_selected_type: (state, action: PayloadAction<ConfigurationTypes>) => {
          state.selected_type = action.payload
        },
      update_meeting_category: (state, action: PayloadAction<MeetingCategoryRow>) => {
        var category = state.meetings_categories.find(cat => cat.id == action.payload.id);
        if (category) {
          category.name = action.payload.name;
          category.trackerId = action.payload.trackerId;
          category.link = action.payload.link;
        } else {
          state.meetings_categories = [...state.meetings_categories, action.payload ]
        }
      },
      add_new_meeting_category: (state)  =>  {
        const payload: MeetingCategoryRow =  { id: uuidv4(), link: '', name:'', trackerId: '' };
        state.meetings_categories = [ ...state.meetings_categories, payload ]
      },
      remove_meeting_category: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.meetings_categories.filter(todo => !action.payload.includes(todo.id))
        state.meetings_categories = newTodos
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCredentialsAsync.fulfilled, (state, action) => {
          state.credentials = action.payload ?? null
        })
        .addCase(getCredentialsAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })
        
        .addCase(setCredentionalsAsync.pending, (state, action) => {
          // state.loaded_events = action.payload ?? [];
        })
        .addCase(setCredentionalsAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
          // state.loaded_events = action.payload ?? [];
        })
        .addCase(setCredentionalsAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(getMeetingCategoriesAsync.pending, (state, action) => {
          state.meeting_state = 'loading'
        })
        .addCase(getMeetingCategoriesAsync.fulfilled, (state, action) => {
          state.meeting_state = 'idle'
          state.meetings_categories = action.payload.map(category => ({ id: uuidv4(), name: category.name, link: category.link, trackerId: category.trackerId }));
        })
        .addCase(getMeetingCategoriesAsync.rejected, (state, action) => {
          state. meeting_state = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(setMeetingCategoriesAsync.pending, (state, action) => {
          // state.loaded_events = action.payload ?? [];
        })
        .addCase(setMeetingCategoriesAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
          // state.loaded_events = action.payload ?? [];
        })
        .addCase(setMeetingCategoriesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })
    },
  });
  
  export const { change_selected_type, update_meeting_category, add_new_meeting_category, remove_meeting_category } = configurationSlice.actions;

  export const selectCredentials = (state: RootState) => state.configuration.credentials;

  export const selectSelectedType = (state: RootState) => state.configuration.selected_type;
  
  export default configurationSlice.reducer;