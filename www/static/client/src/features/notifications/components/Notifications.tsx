import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../common/hooks';
import styled from '@emotion/styled';
import { RootState } from '../../../common/types';
import { NotificationMessage, NotificationMessageProps } from '../types';
import { notificationsActions } from '../notificationsSlice';
import src from '../assets/icon.svg';

const Notifications: React.FC = () => {
  const state = useSelector((state: RootState) => state.notifications);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const createOnClick = (route) => (e: React.MouseEvent) => {
    dispatch(notificationsActions.toggle());
    history.push(route);
  };

  let messages: React.ReactElement[];
  if (state.messages.length == 0) {
    messages = [(<NotificationEmptyMessage key={'notifications:empty-message'} data-testid={'notifications:empty-message'}>{'There\'s nothing here!'}</NotificationEmptyMessage>)]
  } else {
    messages = state.messages.map((m: NotificationMessage, i: number) => {
      return (<NotificationMessage key={`notifications:message-${i}`} data-testid={`notifications:message-${i}`} onClick={createOnClick(m.route)} isUnread={m.isUnread}>{m.text}</NotificationMessage>)
    })
  }

  return (
    <Wrapper isOpen={state.isOpen} data-testid='notifications'>
      <IconWrapper data-testid='notifications:icon' onClick={(e) => {
        dispatch(notificationsActions.toggle())
      }}>
        <img src={src} style={{height: 'auto', width: '25px'}}/>
      </IconWrapper>
      {
        state.unreadCount > 0 &&
        <UnreadCount data-testid='notifications:unread-count'>{state.unreadCount}</UnreadCount>
      }
      {
        state.isOpen &&
        <NotificationMessagesWrapper data-testid='notifications:messages'>
          {messages}
        </NotificationMessagesWrapper>       
      }
    </Wrapper>
  );
};

export interface WrapperProps {
  isOpen: boolean;
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props: WrapperProps) => props.isOpen ? '#797979' : 'transparent'};
  border-top-left-radius: 25%;
  border-top-right-radius: 25%;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 0 0.7rem;
  position: relative;
  z-index: 200;

  &:hover { 
    background-color: 555555;
  }
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
`;

const UnreadCount = styled.div`
  background-color: red;
  border-radius: 50%;
  box-sizing: border-box;
  color: white;
  font-size: 10px;
  font-weight: 600;
  height: 14px;
  width: 14px;
  position: absolute;
  right: calc(.7rem - 6px);
  text-align: center;
  top: calc(50% - 16px);;
`;

const NotificationMessagesWrapper = styled.div`
  background-color: #333333;
  border: 1px solid rgba(175,175,175);
  min-width: 280px;
  position: absolute;
  right: 0;
  top: 100%;
`;

const NotificationMessage = styled.div`
  background-color: ${(props: NotificationMessageProps) => props.isUnread ? 'rgba(254,235,162, 0.5)' : 'transparent'};
  border-bottom: 1px dotted rgba(175,175,175);
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
  padding: .25rem .5rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #555555;
  }
`;

const NotificationEmptyMessage = styled.div`
  box-sizing: border-box;
  color: #888;
  font-size: 12px;
  font-weight: 600;
  padding: .5rem .5rem;
`;


export default Notifications;