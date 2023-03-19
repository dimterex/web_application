import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ConfigurationTypes } from "./configurationTypes";
import { ConfigurationState } from "./interfaces/configurationState";

export interface ConfigurationContainerProps {
  types: ['credentials', 'urls', 'outlook_categories', 'todoist_categories', 'tokens'],
}

const initialState: ConfigurationState = {
  selected_type: ConfigurationTypes.credentials,
};


export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
      change_selected_type: (state, action: PayloadAction<ConfigurationTypes>) => {
          state.selected_type = action.payload
        },
    },
    extraReducers: (builder) => {
    },
  });
  
  export const { 
    change_selected_type,
  } = configurationSlice.actions;

  export const selectSelectedType = (state: RootState) => state.configuration.selected_type;
  
  export default configurationSlice.reducer;