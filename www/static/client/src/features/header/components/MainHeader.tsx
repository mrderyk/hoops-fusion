import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';

import Search from '../../search/components/Search';


const MainHeader: FC= (): ReactElement => {
  return (
    <ContentWrapper>
      <TitleWrapper>
        <TitleContent>HoopsFusion</TitleContent>
      </TitleWrapper>
      <SearchWrapper><Search/></SearchWrapper>
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
  padding-left: 0.3em;
  padding-right: .7em;
  position: relative;
`;

const TitleContent = styled.div`
  height: 1.3em;
`;

const SearchWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding-left: .3em;
`;

export default MainHeader;