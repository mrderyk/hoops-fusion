import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './types';

const fetchResultsFromAPI = async (query: string) => {
  const response = await fetch(`/search/${query}`);
  const body = await response.json();
  return body
};

const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async (query: string) => {
    const response = await fetchResultsFromAPI(query);
    return response;
  }
);

const initialState: SearchState = {
  query: '',
  isFetching: false,
  selectedResultIndex: -1,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    updateQuery: (state: SearchState, action: PayloadAction<string>) => {
      state.searchResults = undefined;
      const query = action.payload;
      state.query = query;
    },
    closeSearch: (state: SearchState) => {
      state.query = '';
      state.searchResults = undefined;
      state.selectedResultIndex = -1;
    },
    navigateToNextResult: (state: SearchState) => {
      if (!state.searchResults) return;

      const nextResultIndex = state.selectedResultIndex + 1;
      let numTotalSearchResults = 0;
      Object.keys(state.searchResults).forEach((k) => {
        numTotalSearchResults += state.searchResults[k].length;
      });
      
      state.selectedResultIndex = nextResultIndex === numTotalSearchResults ? -1 : nextResultIndex;
    },
    navigateToPreviousResult: (state: SearchState) => {
      if (!state.searchResults) return;
      const prevResultIndex = state.selectedResultIndex - 1 ;
      let numTotalSearchResults = 0;
      Object.keys(state.searchResults).forEach((k) => {
        numTotalSearchResults += state.searchResults[k].length;
      });

      switch (state.selectedResultIndex) {
        case -1:
          state.selectedResultIndex = numTotalSearchResults - 1;
          break;
        case 0:
          state.selectedResultIndex = -1;
          break;
        default:
          state.selectedResultIndex = prevResultIndex;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      const players = action.payload.results.map((result) => {
        return {
          label: `${result.first_name} ${result.last_name}`,
          imgURL: result.img_url,
          key: result.key,
        }
      });
      state.isFetching = false;
      state.searchResults = {
        players
      }
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.isFetching = false;
    });
  }
});

export const searchActions = { 
  ...searchSlice.actions,
  fetchResults
}

export default searchSlice.reducer;