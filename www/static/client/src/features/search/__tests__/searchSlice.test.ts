import { AnyAction } from 'redux';
import reducer, { searchActions } from '../searchSlice';

const searchResults = {
  players: [{
    label: 'mock-label-1',
    imgURL: 'mock-imgURL-1',
    key: 'mock-key-1',
  }, {
    label: 'mock-label-2',
    imgURL: 'mock-imgURL-2',
    key: 'mock-key-2',
  }, {
    label: 'mock-label-3',
    imgURL: 'mock-imgURL-3',
    key: 'mock-key-3',
  }]
};

const commonStateForSearchID = {
  query: 'mock-query',
  isFetching: false,
  selectedResultIndex: -1,
}

test('should return the initial state', () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({});
});

test('should create a new state for a search instance', () => {
  expect(reducer(undefined, searchActions.initiateSearch('mock-search-id'))).toEqual({
    'mock-search-id': {
      isFetching: false,
      query: '',
      selectedResultIndex: -1,
    }
  });
});

test('should delete unneeded state for a search instance', () => {
  const initialState = {
    'mock-search-id': {
      query: 'mock-query',
      isFetching: false,
      selectedResultIndex: -1,
    }
  };

  expect(reducer(initialState, searchActions.closeSearch('mock-search-id'))).toEqual({});
});

test('should update a query for a specific search instance state', () => {
  const initialState = {
    'mock-search-id': {
      query: 'mock-query',
      isFetching: false,
      selectedResultIndex: -1,
    },
    'mock-search-id-2': {
      query: '',
      isFetching: false,
      selectedResultIndex: -1
    }
  };
  const actionPayload = {
    updatedQuery:'mock-query-2',
    searchID: 'mock-search-id-2',
  }

  expect(reducer(initialState, searchActions.updateQuery(actionPayload))).toMatchObject({
    'mock-search-id-2': {
      query: 'mock-query-2',
      isFetching: false,
      selectedResultIndex: -1
    }
  });
});

test('should be able to navigate to the next search result', () => {
  const stateBeforeNavigateStart = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: -1,
    }
  };

  const stateBeforeNavigateToNext = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: 0,
    }
  };

  const stateBeforeNavigatePastLastResult = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: 2,
    }
  };

  expect(reducer(stateBeforeNavigateStart, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigateStart['mock-search-id'],
      selectedResultIndex: 0
    }
  });

  expect(reducer(stateBeforeNavigateToNext, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigateToNext['mock-search-id'],
      selectedResultIndex: 1
    }
  });

  expect(reducer(stateBeforeNavigatePastLastResult, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigatePastLastResult['mock-search-id'],
      selectedResultIndex: -1
    }
  });
});

test('should be able to navigate to the previous search result', () => {
  const stateBeforeNavigateStart = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: -1,
    }
  };

  const stateBeforeNavigateToPrevious = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: 2,
    }
  };

  const stateBeforeNavigateBeforeFirstResult = {
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: searchResults,
      selectedResultIndex: 0,
    }
  };

  expect(reducer(stateBeforeNavigateStart, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigateStart['mock-search-id'],
      selectedResultIndex: 2
    }
  });

  expect(reducer(stateBeforeNavigateToPrevious, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigateToPrevious['mock-search-id'],
      selectedResultIndex: 1
    }
  });

  expect(reducer(stateBeforeNavigateBeforeFirstResult, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...stateBeforeNavigateBeforeFirstResult['mock-search-id'],
      selectedResultIndex: -1
    }
  });
});

test('should retrieve results from the server and add them into the state', () => {
  const initialState = {
    'mock-search-id': {
      query: 'mock-query',
      isFetching: false,
      selectedResultIndex: -1,
    }
  };
  const searchResults = {
    results: [
      {
        first_name: 'mock-first-name',
        img_url: 'mock-img-url',
        key: 'mock-key',
        last_name: 'mock-last-name',
        team_code: 'mock-team-code'
      }
    ]
  };
  const actionMeta = {
    arg: {
      searchID: 'mock-search-id'
    }
  };
  const pendingAction = {
    type: searchActions.fetchResults.pending.type,
    meta: actionMeta,
  };
  const fulfilledAction = {
    type: searchActions.fetchResults.fulfilled.type,
    meta: actionMeta,
    payload: searchResults
  };
  const rejectedAction = {
    type: searchActions.fetchResults.rejected.type,
    meta: actionMeta,
  };

  expect(reducer(initialState, pendingAction)).toEqual({
    'mock-search-id': {
      ...commonStateForSearchID,
      isFetching: true,
    }
  });

  expect(reducer(initialState, fulfilledAction)).toEqual({
    'mock-search-id': {
      ...commonStateForSearchID,
      searchResults: {
        players: [{
          label: `${searchResults.results[0].first_name} ${searchResults.results[0].last_name}`,
          imgURL: searchResults.results[0].img_url,
          key: searchResults.results[0].key,
        }]
      },
      isFetching: false,
    }
  });

  expect(reducer(initialState, rejectedAction)).toEqual({
    'mock-search-id': {
      ...commonStateForSearchID,
      isFetching: false,
    }
  });
});