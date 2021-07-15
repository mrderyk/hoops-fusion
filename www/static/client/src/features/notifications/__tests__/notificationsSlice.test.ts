import { AnyAction } from '@reduxjs/toolkit';
import reducer, { initialState, notificationsActions } from '../notificationsSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
});

test('should track the connecting state', () => {
  expect(reducer(initialState, notificationsActions.connect())).toEqual({
    ...initialState,
    isConnected: false,
    isConnecting: true
  });
});

test('should handle a connection failure', () => {
  expect(
    reducer({
        ...initialState,
        isConnecting: true
      }, 
      notificationsActions.handleConnectFailure()
    )
  ).toEqual(initialState);
});

test('should track opening and closing the messages window', () => {
  expect(reducer(initialState, notificationsActions.toggle())).toEqual({ ...initialState, isOpen: true});
  expect(reducer({ ...initialState, isOpen: true}, notificationsActions.toggle())).toEqual({ ...initialState });
});

test('should add messages to the store', () => {
  const actionPayload = {
    text: 'mock-text',
    route: 'mock-route'
  }

  expect(reducer(initialState, notificationsActions.addMessage(actionPayload)))
    .toEqual({ 
      ...initialState,
      messages: [{
        text: 'mock-text',
        route: 'mock-route',
        isUnread: true
      }],
      unreadCount: 1
    });
});
