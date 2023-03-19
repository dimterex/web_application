import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getContainerWithPorts } from "../../../api/docker/dockerApi";
import { RootState } from "../../../app/store";
import { NotificationService } from "../../../common/notification/notificationService";
import { DockerState } from "./interfaces/dockerState";


export interface DockerProps {
  types: ['credentials', 'urls', 'outlook_categories', 'todoist_categories', 'tokens'],
}

const initialState: DockerState = {
  status: 'loading',
  containers: [],
};


export const getContainerWithPortsAsync = createAsyncThunk('docker/getContainerWithPortsAsync', 
    async (_, { rejectWithValue }) => {
    const response = await getContainerWithPorts();
    if (response.status == 'ok') {
      return response.messages;
    }
    return rejectWithValue(response.exception)
  }
);

export const dockerSlice = createSlice({
    name: 'docker',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(getContainerWithPortsAsync.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getContainerWithPortsAsync.fulfilled, (state, action) => {
          state.status = 'idle'
          state.containers = action.payload;
        })
        .addCase(getContainerWithPortsAsync.rejected, (state, action) => {
          state. status = 'idle';
          NotificationService.raise_error(null, action.payload as string);
        })
    },
  });
  
  export const { 

  } = dockerSlice.actions;

  export const selectContainers = (state: RootState) => state.dockerSlice.containers;
  
  export default dockerSlice.reducer;