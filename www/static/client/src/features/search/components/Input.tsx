import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import PulseLoader from "react-spinners/PulseLoader";
import { useAppDispatch } from '../../../common/hooks';
import { searchActions } from '../searchSlice';
import { RootState } from '../../../common/types';
import { useHistory } from 'react-router-dom';

interface SearchInputProps {
  isMicro: boolean;
}

let debouncedFetch: (query: string) => void;

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const history = useHistory();
  const state = useSelector((state: RootState) => state.search)
  const dispatch = useAppDispatch()

  debouncedFetch = debouncedFetch || debounce((query: string) => {
    dispatch(searchActions.fetchResults(query));
  }, 500);
  

  return (
    <InputWrapper isMicro={props.isMicro}>
      <StyledInput
        isMicro={props.isMicro}
        value={state.query}
        placeholder={'Search for a player'}
        onChange={(e) => {
          const updatedQuery = e.currentTarget.value;
          dispatch(searchActions.updateQuery(updatedQuery));
          if (updatedQuery.length > 2) {
            debouncedFetch(updatedQuery);
          }
        }}
        onKeyDown = {(e) => {
          switch (e.key) {
            case 'Down': 
            case 'ArrowDown':
              dispatch(searchActions.navigateToNextResult());
              break;
            case 'Up':
            case 'ArrowUp':
              dispatch(searchActions.navigateToPreviousResult());
              break;
            case 'Enter':
              if (state.selectedResultIndex == -1) return;
              const selectedResultData = state.searchResults.players[state.selectedResultIndex];
              dispatch(searchActions.closeSearch());
              history.push(`/player/${selectedResultData.key}`);
              break;
          }
        }}
      />
      {
        (
          state.isFetching && <SpinnerWrapper isMicro={props.isMicro}>
            <PulseLoader size={props.isMicro ? 2 : 6} color={'#555555'}/>
          </SpinnerWrapper>
        )
      }
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  max-width: ${(props: SearchInputProps) => props.isMicro ? '400': '600' }px;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: ${(props: SearchInputProps) => props.isMicro ? '16': '30' }px;
  padding-left: 4px;
  padding-right: 48px;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: ${(props: SearchInputProps) => props.isMicro ? '8': '14' }px;;
`;

export default SearchInput