import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from './types';


export const initialState: NotificationsState = {
  isConnecting: false,
  isConnected: false,
  messages: [],
  unreadCount: 0,
  isOpen: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    connect: (state: NotificationsState) => {
      state.isConnecting = true;
    },
    handleConnectFailure: (state: NotificationsState) => {
      state.isConnecting = false;
    },
    toggle: (state: NotificationsState) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state: NotificationsState, action) => {
      state.unreadCount = state.unreadCount + 1;
      state.messages.push({
        text: action.payload.text,
        route: action.payload.route,
        isUnread: true
      });
    }
  }
});

export const notificationsActions = { 
  ...notificationsSlice.actions
};

export default notificationsSlice.reducer;