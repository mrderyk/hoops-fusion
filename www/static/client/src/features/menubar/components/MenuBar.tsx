import * as React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Search from '../../search/components/Search';
import { SearchType } from 'src/features/search/types';

interface MenuBarProps {
  showSearch: boolean;
}

const MenuBar: React.FC = () => {
  const history = useHistory();

  return (
    <MenuBarWrapper>
      <TitleWrapper onClick={(e) => {
        history.push(`/`);
      }}>
        HF
      </TitleWrapper>
      <SearchWrapper>
        <div style={{textAlign: 'right', flex: 1}}>
          <Search id={uuid()} type={SearchType.MINI}/>
        </div>
      </SearchWrapper>
    </MenuBarWrapper>
  )
}

const TitleWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  font-family: 'Heebo', sans-serif;
  font-size: 14px;
  padding-right: .7em;
  position: relative;
`;

const SearchWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
`;

const MenuBarWrapper = styled.div`
  background-color: #333;
  border-bottom: 1px solid rgba(175,175,175);
  box-sizing: border-box;
  display: flex;
  height: 50px;
  padding: .6rem 1rem;
`;

export default MenuBar;