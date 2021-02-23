import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import Input from './Input';
import { RootState } from '../../../common/types';
import Results from './Results';
import { useOutsideClickHandler } from '../../../common/hooks';

// TODO: DRY up with Search
const MiniSearch: React.FC = (props) => {
	const state = useSelector((state: RootState) => state.search)
  const ref = useRef(null);

  useOutsideClickHandler(ref);

  const results = state.searchResults ? (
    <Results 
      isMicro={true}
      selectedResultIndex={state.selectedResultIndex}
      searchString={state.query}
      players={state.searchResults.players} 
    />
  ) : undefined;

  return (
    <SearchWrapper ref={ref}>
      <Input isMicro={true} />
      {results}
    </SearchWrapper>
   );
}

const SearchWrapper = styled.div`
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  width: 100%;
  z-index: 100;
`;

export default MiniSearch