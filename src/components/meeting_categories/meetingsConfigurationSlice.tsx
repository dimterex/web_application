import { GridRowId } from "@mui/x-data-grid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMeetingCategories, setMeetingCategories, addNewMeetingCategory, removeMeetingCategories } from "../../api/configuration/meetingCategoriesApi";
import { NotificationService } from "../notification/notificationService";

import { MeetingCategoryModel } from "./meetingCategoryModel";
import { MeetingsConfigurationState } from "./meetingsConfigurationState";

const initialState: MeetingsConfigurationState = {
  meetings_categories: [],
  meeting_state: 'loading',
};

const SLICE_NAME = "meetingsConfiguration";

export const getMeetingCategoriesAsync = createAsyncThunk(`${SLICE_NAME}/getMeetingCategoriesAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await getMeetingCategories();
        if (response.status == 'ok') {
            return response.categories;
        }
        return rejectWithValue(response.exception)
    }
);

export const setMeetingCategoriesAsync = createAsyncThunk(`${SLICE_NAME}/setMeetingCategoriesAsync`, 
    async (categories: MeetingCategoryModel[], { rejectWithValue }) => {
        const response = await setMeetingCategories(categories);
        if (response.status == 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
  }
);

export const addNewMeetingCategoryAsync = createAsyncThunk(`${SLICE_NAME}/addNewMeetingCategoryAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await addNewMeetingCategory();
        if (response.status == 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
    }
);

export const removeMeetingCategoriesAsync = createAsyncThunk(`${SLICE_NAME}/removeMeetingCategoriesAsync`, 
    async (ids: GridRowId[], { rejectWithValue }) => {
        var id_numbers = ids.map((x) => {
            return x as number
        });
        const response = await removeMeetingCategories(id_numbers);
        if (response.status == 'ok') {
            return {
                message: response.message,
                ids: id_numbers,
            };
        }
        return rejectWithValue(response.message)
    }
);

export const meetingsConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      update_meeting_category: (state, action: PayloadAction<MeetingCategoryModel>) => {
        var category = state.meetings_categories.find(cat => cat.id == action.payload.id);
        if (category) {
          category.name = action.payload.name;
          category.trackerId = action.payload.trackerId;
          category.link = action.payload.link;
        } else {
          state.meetings_categories = [...state.meetings_categories, action.payload ]
        }
      },
    },
    extraReducers: (builder) => {
      builder

        .addCase(getMeetingCategoriesAsync.pending, (state, action) => {
          state.meeting_state = 'loading'
        })
        .addCase(getMeetingCategoriesAsync.fulfilled, (state, action) => {
          state.meeting_state = 'idle'
          state.meetings_categories = action.payload;
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

        .addCase(addNewMeetingCategoryAsync.pending, (state, action) => {

        })
        .addCase(addNewMeetingCategoryAsync.fulfilled, (state, action) => {
            var id = parseInt(action.payload)
            const payload: MeetingCategoryModel =  { id: id, link: '', name:'', trackerId: '' };
            state.meetings_categories = [ ...state.meetings_categories, payload ]
        })
        .addCase(addNewMeetingCategoryAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(removeMeetingCategoriesAsync.pending, (state, action) => {
        })
        .addCase(removeMeetingCategoriesAsync.fulfilled, (state, action) => {
            const new_states = state.meetings_categories.filter(x => !action.payload.ids.includes(x.id))
            state.meetings_categories = new_states
        })
        .addCase(removeMeetingCategoriesAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

    },
  });
  
  export const { 
    update_meeting_category,
  } = meetingsConfigurationSlice.actions;

  export default meetingsConfigurationSlice.reducer;