import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigurationTypes } from "./configurationTypes";
import { ConfigurationState } from "./interfaces/configurationState";

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

export default configurationSlice.reducer;