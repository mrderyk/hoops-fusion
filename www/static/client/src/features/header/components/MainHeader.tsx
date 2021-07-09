import * as React from 'react';
import { FC, ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';

import Search from '../../search/components/Search';
import { SearchType } from 'src/features/search/types';


const MainHeader: FC= (): ReactElement => {
  return (
    <ContentWrapper>
      <TitleWrapper>HoopsFusion<sup>alpha</sup>
      </TitleWrapper>
      <SearchWrapper>
        <Search id={uuid()} type={SearchType.DEFAULT}/>
      </SearchWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background-color: #333;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  font-family: 'Heebo', sans-serif;
  justify-content: space-between;
  padding: .5em 0;
  width: 100%;
`;

const TitleWrapper = styled.div`
  align-items: center;
  color: rgb(255, 255, 255);
  display: flex;
  flex-grow: 0;
  font-size: 60px;
  font-weight: 100;
  padding: 0 1rem;
  position: relative;

  sup {
    font-size: 12px;
    margin-left: 5px;
  }

  @media only screen 
    and (min-width: 375px) 
    and (max-width: 667px) { 
      font-size: 50px;
      
      sup {
        font-size: 10px;
      }
  }
`;

const SearchWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  min-width: 400px;
  padding: 0 1rem;

  @media only screen 
    and (min-width: 375px) 
    and (max-width: 667px) { 
      min-width: 320px;
  }
`;

export default MainHeader;