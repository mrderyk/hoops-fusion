import * as React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Search from '../../search/components/Search';
import { SearchType } from 'src/features/search/types';
import { prependOnceListener } from 'node:process';
import Notifications from 'src/features/notifications/components/Notifications';

interface MenuBarProps {
  showTitle?: boolean;
  showSearch?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = (props: MenuBarProps) => {
  const history = useHistory();

  return (
    <MenuBarWrapper>
      {
        props.showTitle &&
        <TitleWrapper onClick={(e) => {
          history.push(`/`);
        }}>
          HF
        </TitleWrapper>
      }

      {
        props.showSearch && 
        <SearchWrapper>
          <div style={{textAlign: 'right', flex: 1}}>
            <Search id={uuid()} type={SearchType.MINI}/>
          </div>
        </SearchWrapper>
      }
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
  padding-right: .7rem;
  position: relative;
`;

const SearchWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
`;

const NotificationsWrapper = styled.div`
  flex: 0;
  margin-left: auto;
`;

const MenuBarWrapper = styled.div`
  background-color: #333;
  border-bottom: 1px solid rgba(175,175,175);
  box-sizing: border-box;
  display: flex;
  height: 40px;
  padding: 0 1rem;
`;

export default MenuBar;