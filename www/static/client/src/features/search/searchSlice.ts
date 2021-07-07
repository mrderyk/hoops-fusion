import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { QueryFetchParams, SearchState, SearchStates } from './types';



const fetchResultsFromAPI = async (query: string) => {
  const response = await fetch(`/search/${query}`);
  const body = await response.json();
  return body
};

const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async (params: QueryFetchParams) => {
    const { query, searchID } = params;
    const response = await fetchResultsFromAPI(query);
    return response;
  }
);

const initialState: SearchStates = {};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    initiateSearch: (state: SearchStates, action) => {
      const instanceState = {
        query: '',
        isFetching: false,
        selectedResultIndex: -1,
      };

      state[action.payload] = instanceState
    },
    updateQuery: (state: SearchStates, action) => {
      const { updatedQuery, searchID } = action.payload;
      const instanceState = state[searchID];

      instanceState.searchResults = undefined;
      instanceState.query = updatedQuery;
    },
    closeSearch: (state: SearchStates, action) => {
      const instanceState = state[action.payload];

      if (instanceState) {
        instanceState.query = '';
        instanceState.isFetching = false;
        instanceState.searchResults = undefined;
      }
      delete state[action.payload];
    },
    navigateToNextResult: (state: SearchStates, action) => {
      const instanceState = state[action.payload];
      if (!instanceState.searchResults) return;

      const nextResultIndex = instanceState.selectedResultIndex + 1;
      let numTotalSearchResults = 0;
      Object.keys(instanceState.searchResults).forEach((k) => {
        numTotalSearchResults += instanceState.searchResults[k].length;
      });
      
      instanceState.selectedResultIndex = nextResultIndex === numTotalSearchResults ? -1 : nextResultIndex;
    },
    navigateToPreviousResult: (state: SearchStates, action) => {
      const instanceState = state[action.payload];
      
      if (!instanceState.searchResults) return;
      const prevResultIndex = instanceState.selectedResultIndex - 1 ;
      let numTotalSearchResults = 0;
      Object.keys(instanceState.searchResults).forEach((k) => {
        numTotalSearchResults += instanceState.searchResults[k].length;
      });

      switch (instanceState.selectedResultIndex) {
        case -1:
          instanceState.selectedResultIndex = numTotalSearchResults - 1;
          break;
        case 0:
          instanceState.selectedResultIndex = -1;
          break;
        default:
          instanceState.selectedResultIndex = prevResultIndex;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state, action) => {
      const instanceState = state[action.meta.arg.searchID];
      instanceState.isFetching = true;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      const instanceState = state[action.meta.arg.searchID];
      const players = action.payload.results.map((result) => {
        return {
          label: `${result.first_name} ${result.last_name}`,
          imgURL: result.img_url,
          key: result.key,
        }
      });
      instanceState.isFetching = false;
      instanceState.searchResults = {
        players
      }
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      const instanceState = state[action.meta.arg.searchID];
      instanceState.isFetching = false;
    });
  }
});

export const searchActions = { 
  ...searchSlice.actions,
  fetchResults
}

export default searchSlice.reducer;