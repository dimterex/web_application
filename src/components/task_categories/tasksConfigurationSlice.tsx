import { GridRowId } from "@mui/x-data-grid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTaskCategories, setTaskCategories, addNewTaskCategory, removeTaskCategories } from "../../api/configuration/taskCategoriesApi";
import { NotificationService } from "../notification/notificationService";

import { TaskCategoryModel } from "./taskCategoryModel";
import { TasksConfigurationState } from "./tasksConfigurationState";

const initialState: TasksConfigurationState = {
  task_categories: [],
  tasks_state: 'loading',
};

const SLICE_NAME = "tasksConfiguration";

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
      return response.message;
    }
    return rejectWithValue(response.message)
  }
);

export const addNewMTaskCategoryAsync = createAsyncThunk(`${SLICE_NAME}/addNewMTaskCategoryAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await addNewTaskCategory();
        if (response.status == 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
    }
);

export const removeTaskCategoriesAsync = createAsyncThunk(`${SLICE_NAME}/removeTaskCategoriesAsync`, 
    async (ids: GridRowId[], { rejectWithValue }) => {
        var id_numbers = ids.map((x) => {
            return x as number
        });
        const response = await removeTaskCategories(id_numbers);
        if (response.status == 'ok') {
            return {
                message: response.message,
                ids: id_numbers,
            };
        }
        return rejectWithValue(response.message)
    }
);

export const tasksConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      update_task_category: (state, action: PayloadAction<TaskCategoryModel>) => {
        var category = state.task_categories.find(cat => cat.id == action.payload.id);
        if (category) {
          category.name = action.payload.name;
          category.trackerId = action.payload.trackerId;
          category.link = action.payload.link;
        } else {
          state.task_categories = [...state.task_categories, action.payload ]
        }
      },
    },
    extraReducers: (builder) => {
      builder

        .addCase(getTaskCategoriesAsync.pending, (state, action) => {
          state.tasks_state = 'loading'
        })
        .addCase(getTaskCategoriesAsync.fulfilled, (state, action) => {
          state.tasks_state = 'idle'
          state.task_categories = action.payload;
        })
        .addCase(getTaskCategoriesAsync.rejected, (state, action) => {
          state.tasks_state = 'idle';
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

        .addCase(addNewMTaskCategoryAsync.pending, (state, action) => {

        })
        .addCase(addNewMTaskCategoryAsync.fulfilled, (state, action) => {
            var id = parseInt(action.payload)
            const payload: TaskCategoryModel =  { id: id, link: '', name:'', trackerId: '' };
            state.task_categories = [ ...state.task_categories, payload ]
        })
        .addCase(addNewMTaskCategoryAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(removeTaskCategoriesAsync.pending, (state, action) => {
        })
        .addCase(removeTaskCategoriesAsync.fulfilled, (state, action) => {
            const new_states = state.task_categories.filter(x => !action.payload.ids.includes(x.id))
            state.task_categories = new_states
        })
        .addCase(removeTaskCategoriesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

    },
  });
  
  export const { 
    update_task_category,
  } = tasksConfigurationSlice.actions;

  export default tasksConfigurationSlice.reducer;