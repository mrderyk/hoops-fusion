import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import PulseLoader from 'react-spinners/PulseLoader';
import { useAppDispatch } from '../../../common/hooks';
import { searchActions } from '../searchSlice';
import { RootState } from '../../../common/types';
import { useHistory } from 'react-router-dom';
import { SearchInputProps, SearchType } from '../types';

let debouncedFetcher;

const DebouncedFetcher = (dispatch, searchID) => {
  return {
    activeSearch: searchID,
    fetch:  debounce((query: string) => {
      dispatch(searchActions.fetchResults({
        query: query,
        searchID: searchID
      }));
    }, 500)
  }
};

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const history = useHistory();
  const state = useSelector((state: RootState) => state.search)[props.searchID];
  const dispatch = useAppDispatch();

  if (state && (!debouncedFetcher || debouncedFetcher.activeSearch !== props.searchID)) {
    debouncedFetcher = DebouncedFetcher(dispatch, props.searchID);
  }
  
  let pulseLoaderSize: number;

  switch(props.searchType) {
    case SearchType.MINI:
      pulseLoaderSize = 2;
      break;
    case SearchType.MICRO:
      pulseLoaderSize = 2;
      break;
    default:
      pulseLoaderSize = 6;
  }

  return (
    <InputWrapper 
      searchType={props.searchType}
      searchID={props.searchID}
    >
      <StyledInput
        searchType={props.searchType}
        searchID={props.searchID}
        value={state?.query || ''}
        placeholder={props.placeholder || 'Search for a player...'}
        onClick={(e) => {
          dispatch(searchActions.initiateSearch(props.searchID));
        }}
        onChange={(e) => {
          const updatedQuery = e.currentTarget.value;
          dispatch(searchActions.updateQuery({
            updatedQuery: updatedQuery,
            searchID: props.searchID
          }));
          if (updatedQuery.length > 2) {
            debouncedFetcher.fetch(updatedQuery);
          }
        }}
        onKeyDown = {(e) => {
          switch (e.key) {
            case 'Down': 
            case 'ArrowDown':
              dispatch(searchActions.navigateToNextResult(props.searchID));
              break;
            case 'Up':
            case 'ArrowUp':
              dispatch(searchActions.navigateToPreviousResult(props.searchID));
              break;
            case 'Enter':
              if (state.selectedResultIndex == -1) return;
              const selectedResultData = state.searchResults.players[state.selectedResultIndex];
              dispatch(searchActions.closeSearch(props.searchID));

              if (props.onSelectResult) {
                props.onSelectResult(selectedResultData.key)
              } else {
                history.push(`/player/${selectedResultData.key}`);
              }
              break;
          }
        }}
      />
      {
        (
          state?.isFetching && <SpinnerWrapper searchType={props.searchType} searchID={props.searchID}>
            <PulseLoader size={pulseLoaderSize} color={'#555555'}/>
          </SpinnerWrapper>
        )
      }
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  max-width: ${(props: SearchInputProps) => {
    switch(props.searchType) {
      case SearchType.MINI:
        return '400';
      case SearchType.MICRO:
        return 'none';
      case SearchType.DEFAULT:
        return '600';
    }
  }}px;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: ${(props: SearchInputProps) => {
    switch(props.searchType) {
      case SearchType.MINI:
        return '16';
      case SearchType.MICRO:
        return '12';
      case SearchType.DEFAULT:
        return '30';
    }
  }}px;
  padding-left: 4px;
  padding-right: 48px;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: ${(props: SearchInputProps) => {
    switch(props.searchType) {
      case SearchType.MINI:
        return '8';
      case SearchType.MICRO:
        return '6';
      case SearchType.DEFAULT:
        return '14';
    }
  }}px;
`;

export default SearchInput