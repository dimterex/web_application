import { GridRowId } from "@mui/x-data-grid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPeriodicalTasks, setPeriodicalTasks, addNewPeriodicalTask, removePeriodicalTasks } from "../../api/configuration/periodicalTasksApi";
import { NotificationService } from "../notification/notificationService";


import { PeriodicalTaskModel } from "./periodicalTaskModel";
import { PeriodicalTaskConfigurationState } from "./periodicalTasksConfigurationState";

const initialState: PeriodicalTaskConfigurationState = {
  state: 'loading',
  items: [],
};

const SLICE_NAME = "periodicalTasksConfiguration";


export const getPeriodicalTasksAsync = createAsyncThunk(`${SLICE_NAME}/getPeriodicalTasksAsync`, 
    async (_, { rejectWithValue }) => {
    const response = await getPeriodicalTasks();
    if (response.status == 'ok') {
      return response.tasks;
    }
    return rejectWithValue(response.exception)
  }
);

export const setPeriodicalTasksAsync = createAsyncThunk(`${SLICE_NAME}/setPeriodicalTasksAsync`, 
  async (tasks: PeriodicalTaskModel[], { rejectWithValue }) => {
    const response = await setPeriodicalTasks(tasks);
    if (response.status == 'ok') {
      return response.message;
    }
    return rejectWithValue(response.message)
  }
);

export const addNewPeriodicalTaskAsync = createAsyncThunk(`${SLICE_NAME}/addNewUrlAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await addNewPeriodicalTask();
        if (response.status == 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
    }
);

export const removePeriodicalTasksAsync = createAsyncThunk(`${SLICE_NAME}/removeUrlsAsync`, 
    async (ids: GridRowId[], { rejectWithValue }) => {
        var id_numbers = ids.map((x) => {
            return x as number
        });
        const response = await removePeriodicalTasks(id_numbers);
        if (response.status == 'ok') {
            return {
                message: response.message,
                ids: id_numbers,
            };
        }
        return rejectWithValue(response.message)
    }
);

export const periodicalTasksConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      
      update_periodical_task: (state, action: PayloadAction<PeriodicalTaskModel>) => {
        var task = state.items.find(t => t.id == action.payload.id);
        if (task) {
          task.name = action.payload.name;
          task.trackerId = action.payload.trackerId;
          task.duration = action.payload.duration;
        } else {
          state.items = [...state.items, action.payload]
        }
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(getPeriodicalTasksAsync.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(getPeriodicalTasksAsync.fulfilled, (state, action) => {
        state.state = 'idle'
        state.items = action.payload;
      })
      .addCase(getPeriodicalTasksAsync.rejected, (state, action) => {
        state.state = 'idle';
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

        .addCase(addNewPeriodicalTaskAsync.pending, (state, action) => {

        })
        .addCase(addNewPeriodicalTaskAsync.fulfilled, (state, action) => {
            var id = parseInt(action.payload)
            const payload: PeriodicalTaskModel =  { id: id, name:'', trackerId: '', duration: 0 };
            state.items = [ ...state.items, payload ]
        })
        .addCase(addNewPeriodicalTaskAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(removePeriodicalTasksAsync.pending, (state, action) => {
        })
        .addCase(removePeriodicalTasksAsync.fulfilled, (state, action) => {
            const new_states = state.items.filter(x => !action.payload.ids.includes(x.id))
            state.items = new_states
        })
        .addCase(removePeriodicalTasksAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })
    },
  });
  
  export const { 
    update_periodical_task,
  } = periodicalTasksConfigurationSlice.actions;

  export default periodicalTasksConfigurationSlice.reducer;

