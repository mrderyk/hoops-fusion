import * as React from 'react';
import { FC, ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';

import Search from '../../search/components/Search';
import { SearchType } from 'src/features/search/types';


const MainHeader: FC= (): ReactElement => {
  return (
    <ContentWrapper>
      <TitleWrapper>
        <TitleContent>HoopsFusion<sub>alpha</sub></TitleContent>
      </TitleWrapper>
      <SearchWrapper>
        <Search id={uuid()} type={SearchType.DEFAULT}/>
      </SearchWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background-color: rgb(59, 74, 97);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  font-family: 'Timmana', sans-serif;
  justify-content: space-between;
  padding: .5em 0;
  width: 100%;
`;

const TitleWrapper = styled.div`
  align-items: center;
  color: rgb(255, 255, 255);
  display: flex;
  flex-grow: 0;
  font-size: 80px;
  padding: 0 1rem;
  position: relative;
`;

const TitleContent = styled.div`
  height: 100px;
  position: relative;

  sub {
    font-size: 16px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const SearchWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding-left: 1rem;
`;

export default MainHeader;