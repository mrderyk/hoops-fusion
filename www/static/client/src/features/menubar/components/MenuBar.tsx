import * as React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import MiniSearch from '../../search/components/MiniSearch';

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
        <div style={{textAlign: 'right'}}>
          <MiniSearch />
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
  font-family: 'Timmana', sans-serif;
  font-size: 14px;
  padding-right: .7em;
  padding-top: 4px;
  position: relative;
`;

const SearchWrapper = styled.div`
  box-sizing: border-box;
  flex: 1;
  padding-top: 4px;
`;

const MenuBarWrapper = styled.div`
  background-color: rgb(59, 74, 97);
  border-bottom: 1px solid rgba(175,175,175);
  box-sizing: border-box;
  display: flex;
  height: 50px;
  padding: .6rem 1rem;
`;

export default MenuBar;