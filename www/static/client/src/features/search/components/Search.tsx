import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import Input from './Input';
import { RootState } from '../../../common/types';
import Results from './Results';
import { useOutsideClickHandler } from '../../../common/hooks';

const Search: React.FC= (props) => {
	const state = useSelector((state: RootState) => state.search)
  const ref = useRef(null);

  useOutsideClickHandler(ref);

  const results = state.searchResults ? (
    <Results 
      isMicro={false}
      selectedResultIndex={state.selectedResultIndex}
      searchString={state.query}
      players={state.searchResults.players} 
    />
  ) : undefined;

  return (
    <SearchWrapper ref={ref}>
      <Input isMicro={false} />
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