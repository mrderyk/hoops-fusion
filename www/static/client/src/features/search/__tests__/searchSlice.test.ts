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
  searchResults: searchResults,
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
      selectedResultIndex: -1,
    }
  };

  const stateBeforeNavigateToNext= {
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 0,
    }
  };

  const stateBeforeNavigatePastLastResult = {
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 2,
    }
  };

  expect(reducer(stateBeforeNavigateStart, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 0
    }
  });

  expect(reducer(stateBeforeNavigateToNext, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 1
    }
  });

  expect(reducer(stateBeforeNavigatePastLastResult, searchActions.navigateToNextResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: -1
    }
  });
});

test('should be able to navigate to the previous search result', () => {
  const stateBeforeNavigateStart = {
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: -1,
    }
  };

  const stateBeforeNavigateToPrevious = {
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 2,
    }
  };

  const stateBeforeNavigateBeforeFirstResult = {
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 0,
    }
  };

  expect(reducer(stateBeforeNavigateStart, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 2
    }
  });

  expect(reducer(stateBeforeNavigateToPrevious, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: 1
    }
  });

  expect(reducer(stateBeforeNavigateBeforeFirstResult, searchActions.navigateToPreviousResult('mock-search-id'))).toMatchObject({
    'mock-search-id': {
      ...commonStateForSearchID,
      selectedResultIndex: -1
    }
  });
});