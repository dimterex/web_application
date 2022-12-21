import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NotificationService } from "../notification/notificationService";
import { getCredentials, getMeetingCategories, getPeriodicalTasks, getTaskCategories, getTokens, getUrls, setCredentials, setMeetingCategories, setPeriodicalTasks, setTaskCategories, setTokens, setUrls } from "../../api/configuration/configurationApi";
import { ConfigurationTypes } from "./configurationTypes";
import { ConfigurationState } from "./interfaces/configurationState";
import { MeetingCategoryModel } from "./interfaces/meetingCategoryModel";
import { MeetingCategoryRow } from "./pages/meetingsCategoriesView";
import {v4 as uuidv4} from 'uuid';
import { GridRowId } from "@mui/x-data-grid";
import { CredentialModel } from "./interfaces/credentialModel";
import { TaskCategoryModel } from "./interfaces/taskCategoryModel";
import { TaskCategoryRow } from "./pages/taskCategoriesView";
import { TokenModel } from "./interfaces/tokenModel";
import { UrlModel } from "./interfaces/urlModel";
import { TokenModelRow } from "./interfaces/tokenModelRow";
import { UrlModelRow } from "./interfaces/urlModelRow";
import { PeriodicalTaskModel } from "./interfaces/periodicalTaskModel";
import { PeriodicalTaskModelRow } from "./interfaces/periodicalTaskModelRow";


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

  token_state: 'loading',
  tokens: [],

  url_state: 'loading',
  urls: [],

  periodical_tasks_state: 'loading',
  periodical_tasks: [],
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

export const getTokensAsync = createAsyncThunk('configuration/getTokensAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getTokens();
    if (response.status == 'ok') {
      return response.tokens;
    }
    return rejectWithValue(response.exception)
  }
);

export const setTokensAsync = createAsyncThunk('configuration/setTokensAsync', 
  async (tokens: TokenModel[], { rejectWithValue }) => {
    const response = await setTokens(tokens);
    if (response.status == 'ok') {
      return response.exception;
    }
    return rejectWithValue(response.exception)
  }
);

export const getUrlsAsync = createAsyncThunk('configuration/getUrlsAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getUrls();
    if (response.status == 'ok') {
      return response.urls;
    }
    return rejectWithValue(response.exception)
  }
);

export const setUrlsAsync = createAsyncThunk('configuration/setUrlsAsync', 
  async (urls: UrlModel[], { rejectWithValue }) => {
    const response = await setUrls(urls);
    if (response.status == 'ok') {
      return response.exception;
    }
    return rejectWithValue(response.exception)
  }
);

export const getPeriodicalTasksAsync = createAsyncThunk('configuration/getPeriodicalTasksAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getPeriodicalTasks();
    if (response.status == 'ok') {
      return response.tasks;
    }
    return rejectWithValue(response.exception)
  }
);

export const setPeriodicalTasksAsync = createAsyncThunk('configuration/setPeriodicalTasksAsync', 
  async (tasks: PeriodicalTaskModel[], { rejectWithValue }) => {
    const response = await setPeriodicalTasks(tasks);
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

      update_token: (state, action: PayloadAction<TokenModelRow>) => {
        var token = state.tokens.find(t => t.id == action.payload.id);
        if (token) {
          token.name = action.payload.name;
          token.key = action.payload.key;
        } else {
          state.tokens = [...state.tokens, action.payload]
        }
      },
      add_new_token: (state)  =>  {
        const payload: TokenModelRow =  { id: uuidv4(), key: '', name:'' };
        state.tokens = [ ...state.tokens, payload ]
      },
      remove_tokens: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.tokens.filter(todo => !action.payload.includes(todo.id))
        state.tokens = newTodos
      },

      update_url: (state, action: PayloadAction<UrlModelRow>) => {
        var url = state.urls.find(t => t.id == action.payload.id);
        if (url) {
          url.name = action.payload.name;
          url.url = action.payload.url;
        } else {
          state.urls = [...state.urls, action.payload]
        }
      },
      add_new_url: (state)  =>  {
        const payload: UrlModelRow =  { id: uuidv4(), url: '', name:'' };
        state.urls = [ ...state.urls, payload ]
      },
      remove_urls: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.urls.filter(todo => !action.payload.includes(todo.id))
        state.urls = newTodos
      },

      update_periodical_task: (state, action: PayloadAction<PeriodicalTaskModelRow>) => {
        var task = state.periodical_tasks.find(t => t.id == action.payload.id);
        if (task) {
          task.name = action.payload.name;
          task.trackerId = action.payload.trackerId;
          task.duration = action.payload.duration;
        } else {
          state.periodical_tasks = [...state.periodical_tasks, action.payload]
        }
      },
      add_new_periodical_task: (state)  =>  {
        const payload: PeriodicalTaskModelRow =  { id: uuidv4(), name: '',  trackerId: '', duration: 0.5 };
        state.periodical_tasks = [ ...state.periodical_tasks, payload ]
      },
      remove_periodical_tasks: (state, action: PayloadAction<GridRowId[]>) => {
        const newTodos = state.periodical_tasks.filter(todo => !action.payload.includes(todo.id))
        state.periodical_tasks = newTodos
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

        .addCase(getTokensAsync.pending, (state, action) => {
          state.token_state = 'loading'
        })
        .addCase(getTokensAsync.fulfilled, (state, action) => {
          state.token_state = 'idle'
          state.tokens = action.payload.map(model => ({ id: uuidv4(), name: model.name, key: model.key }));
        })
        .addCase(getTokensAsync.rejected, (state, action) => {
          state.token_state = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(setTokensAsync.pending, (state, action) => {
        })
        .addCase(setTokensAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
        })
        .addCase(setTokensAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(getUrlsAsync.pending, (state, action) => {
          state.url_state = 'loading'
        })
        .addCase(getUrlsAsync.fulfilled, (state, action) => {
          state.url_state = 'idle'
          state.urls = action.payload.map(model => ({ id: uuidv4(), name: model.name, url: model.url }));
        })
        .addCase(getUrlsAsync.rejected, (state, action) => {
          state.url_state = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(setUrlsAsync.pending, (state, action) => {
        })
        .addCase(setUrlsAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
        })
        .addCase(setUrlsAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(getPeriodicalTasksAsync.pending, (state, action) => {
          state.periodical_tasks_state = 'loading'
        })
        .addCase(getPeriodicalTasksAsync.fulfilled, (state, action) => {
          state.periodical_tasks_state = 'idle'
          state.periodical_tasks = action.payload.map(model => ({ id: uuidv4(), name: model.name, trackerId: model.trackerId, duration: model.duration }));
        })
        .addCase(getPeriodicalTasksAsync.rejected, (state, action) => {
          state.periodical_tasks_state = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(setPeriodicalTasksAsync.pending, (state, action) => {
        })
        .addCase(setPeriodicalTasksAsync.fulfilled, (state, action) => {
          NotificationService.raise_success(null, action.payload as string);
        })
        .addCase(setPeriodicalTasksAsync.rejected, (state, action) => {
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

    update_token,
    add_new_token,
    remove_tokens,

    update_url,
    add_new_url,
    remove_urls,

    update_periodical_task,
    add_new_periodical_task,
    remove_periodical_tasks,
  } = configurationSlice.actions;

  export const selectCredentials = (state: RootState) => state.configuration.credentials;

  export const selectSelectedType = (state: RootState) => state.configuration.selected_type;
  
  export default configurationSlice.reducer;