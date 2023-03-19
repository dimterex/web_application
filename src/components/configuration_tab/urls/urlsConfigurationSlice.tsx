import { GridRowId } from "@mui/x-data-grid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUrls, setUrls, addNewUrl, removeUrls } from "../../../api/configuration/urlsApi";
import { NotificationService } from "../../../common/notification/notificationService";
import { UrlModel } from "./urlModel";
import { UrlsConfigurationState } from "./urlsConfigurationState";

const initialState: UrlsConfigurationState = {
  url_state: 'loading',
  urls: [],
};

const SLICE_NAME = "urlsConfiguration";


export const getUrlsAsync = createAsyncThunk(`${SLICE_NAME}/getUrlsAsync`, 
    async (_, { rejectWithValue }) => {
    const response = await getUrls();
    if (response.status === 'ok') {
      return response.urls;
    }
    return rejectWithValue(response.exception)
  }
);

export const setUrlsAsync = createAsyncThunk(`${SLICE_NAME}/setUrlsAsync`, 
  async (urls: UrlModel[], { rejectWithValue }) => {
    const response = await setUrls(urls);
    if (response.status === 'ok') {
      return response.message;
    }
    return rejectWithValue(response.message)
  }
);

export const addNewUrlAsync = createAsyncThunk(`${SLICE_NAME}/addNewUrlAsync`, 
    async (_, { rejectWithValue }) => {
        const response = await addNewUrl();
        if (response.status === 'ok') {
            return response.message;
        }
        return rejectWithValue(response.message)
    }
);

export const removeUrlsAsync = createAsyncThunk(`${SLICE_NAME}/removeUrlsAsync`, 
    async (ids: GridRowId[], { rejectWithValue }) => {
        var id_numbers = ids.map((x) => {
            return x as number
        });
        const response = await removeUrls(id_numbers);
        if (response.status === 'ok') {
            return {
                message: response.message,
                ids: id_numbers,
            };
        }
        return rejectWithValue(response.message)
    }
);

export const urlsConfigurationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      
      update_url: (state, action: PayloadAction<UrlModel>) => {
        var url = state.urls.find(t => t.id === action.payload.id);
        if (url) {
          url.name = action.payload.name;
          url.value = action.payload.value;
        } else {
          state.urls = [...state.urls, action.payload]
        }
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(getUrlsAsync.pending, (state, action) => {
        state.url_state = 'loading'
      })
      .addCase(getUrlsAsync.fulfilled, (state, action) => {
        state.url_state = 'idle'
        state.urls = action.payload;
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

        .addCase(addNewUrlAsync.pending, (state, action) => {

        })
        .addCase(addNewUrlAsync.fulfilled, (state, action) => {
            var id = parseInt(action.payload)
            const payload: UrlModel =  { id: id, name:'', value: '' };
            state.urls = [ ...state.urls, payload ]
        })
        .addCase(addNewUrlAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })

        .addCase(removeUrlsAsync.pending, (state, action) => {
        })
        .addCase(removeUrlsAsync.fulfilled, (state, action) => {
            const new_states = state.urls.filter(x => !action.payload.ids.includes(x.id))
            state.urls = new_states
        })
        .addCase(removeUrlsAsync.rejected, (state, action) => {
          NotificationService.raise_error(null, action.payload as string);
        })
    },
  });
  
  export const { 
    update_url,
  } = urlsConfigurationSlice.actions;

  export default urlsConfigurationSlice.reducer;

