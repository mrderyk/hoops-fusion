import * as React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import Input from './Input';
import { RootState } from '../../../common/types';
import Results from './Results';
import { useOutsideClickHandler } from '../../../common/hooks';
import { SearchProps } from '../types';


const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { id, type } = props;
	const state = useSelector((state: RootState) => state.search)
  const ref = useRef(null);
  const isInstanceSearching = state.activeSearchId === id;

  useOutsideClickHandler(ref, () => isInstanceSearching);
  

  const results = (isInstanceSearching && state.searchResults) ? (
    <Results
      type={type}
      selectedResultIndex={state.selectedResultIndex}
      searchString={state.query}
      players={state.searchResults.players}
      onSelectResult={props.onSelectResult}
    />
  ) : undefined;

  return (
    <SearchWrapper ref={ref}>
      <Input 
        searchID={id}
        searchType={props.type}
      />
      {results}
    </SearchWrapper>
   );
}

const SearchWrapper = styled.div`
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  position: relative;
  width: 100%;
  z-index: 100;
`;

export default Search