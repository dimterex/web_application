import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NotificationService } from "../notification/notificationService";
import { getCredentials, getMeetingCategories, getTaskCategories, setCredentials, setMeetingCategories, setTaskCategories } from "../../api/configuration/configurationApi";
import { ConfigurationTypes } from "./configurationTypes";
import { ConfigurationState } from "./interfaces/configurationState";
import { MeetingCategoryModel } from "./interfaces/meetingCategoryModel";
import { MeetingCategoryRow } from "./pages/meetingsCategoriesView";
import {v4 as uuidv4} from 'uuid';
import { GridRowId } from "@mui/x-data-grid";
import { CredentialModel } from "./interfaces/credentialModel";
import { TaskCategoryModel } from "./interfaces/taskCategoryModel";
import { TaskCategoryRow } from "./pages/taskCategoriesView";


export interface ConfigurationContainerProps {
  types: ['credentials', 'urls', 'outlook_categories', 'todoist_categories', 'tokens'],
}

const initialState: ConfigurationState = {
  credentials: null,
  selected_type: ConfigurationTypes.credentials,

  meetings_categories: [],
  meeting_state: 'loading',

  task_categories: [],
  task_state: 'loading',
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
  async (categories: MeetingCategoryModel[], { rejectWithValue }) => {
    const response = await setMeetingCategories(categories);
    if (response.status == 'ok') {
      return response.exception;
    }
    return rejectWithValue(response.exception)
  }
);

export const getTaskCategoriesAsync = createAsyncThunk('configuration/getTaskCategoriesAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getTaskCategories();
    if (response.status == 'ok') {
      return response.categories;
    }
    return rejectWithValue(response.exception)
  }
);

export const setTaskCategoriesAsync = createAsyncThunk('configuration/setTaskCategoriesAsync', 
  async (categories: TaskCategoryModel[], { rejectWithValue }) => {
    const response = await setTaskCategories(categories);
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
      remove_meeting_categories: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.meetings_categories.filter(todo => !action.payload.includes(todo.id))
        state.meetings_categories = newTodos
      },

      update_task_category: (state, action: PayloadAction<TaskCategoryRow>) => {
        var category = state.task_categories.find(cat => cat.id == action.payload.id);
        if (category) {
          category.name = action.payload.name;
          category.trackerId = action.payload.trackerId;
          category.link = action.payload.link;
        } else {
          state.task_categories = [...state.task_categories, action.payload ]
        }
      },
      add_new_task_category: (state)  =>  {
        const payload: MeetingCategoryRow =  { id: uuidv4(), link: '', name:'', trackerId: '' };
        state.task_categories = [ ...state.task_categories, payload ]
      },
      remove_task_categories: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.task_categories.filter(todo => !action.payload.includes(todo.id))
        state.task_categories = newTodos
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
        })
        .addCase(setMeetingCategoriesAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
        })
        .addCase(setMeetingCategoriesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(getTaskCategoriesAsync.pending, (state, action) => {
          state.task_state = 'loading'
        })
        .addCase(getTaskCategoriesAsync.fulfilled, (state, action) => {
          state.task_state = 'idle'
          state.task_categories = action.payload.map(category => ({ id: uuidv4(), name: category.name, link: category.link, trackerId: category.trackerId }));
        })
        .addCase(getTaskCategoriesAsync.rejected, (state, action) => {
          state.task_state = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(setTaskCategoriesAsync.pending, (state, action) => {
        })
        .addCase(setTaskCategoriesAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
        })
        .addCase(setTaskCategoriesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

    },
  });
  
  export const { 
    change_selected_type,

    update_meeting_category,
    add_new_meeting_category,
    remove_meeting_categories,

    update_task_category,
    add_new_task_category,
    remove_task_categories,
  } = configurationSlice.actions;

  export const selectCredentials = (state: RootState) => state.configuration.credentials;

  export const selectSelectedType = (state: RootState) => state.configuration.selected_type;
  
  export default configurationSlice.reducer;