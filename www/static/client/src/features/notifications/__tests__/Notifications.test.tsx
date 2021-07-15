import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import store from '../../../app/store';
import Notifications from '../components/Notifications';
import { notificationsActions } from '../notificationsSlice';

test('displays correctly with the default state', () => {
  render(
    <Provider store={store}>
      <Notifications/>
    </Provider>
  );

  expect(screen.queryByTestId('notifications')).toBeDefined();
  expect(screen.queryByTestId('notifications:icon')).toBeDefined();
  expect(screen.queryByTestId('notifications:unread-count')).toBeNull();
  expect(screen.queryByTestId('notifications:messages')).toBeNull();
});

test('displays correctly when open but not containing any notifications', () => {
  render(
    <Provider store={store}>
      <Notifications/>
    </Provider>
  );

  const notificationsIcon = screen.getByTestId('notifications:icon');
  userEvent.click(notificationsIcon, new MouseEvent('click'));

  expect(screen.queryByTestId('notifications:icon')).toBeDefined();
  expect(screen.queryByTestId('notifications:messages')).toBeDefined();
  expect(screen.queryByTestId('notifications:empty-message')).toBeDefined();
  expect(screen.queryByText('There\'s nothing here!')).toBeDefined();
  expect(screen.queryByTestId('notifications:unread-count')).toBeNull();
});

test('displays correctly when closed and containing unread notifications', () => {
  // TODO: Figure this out: initializethe store with test data
  store.dispatch(notificationsActions.addMessage({
    text: 'mock-text',
    route: 'mock-route',
  }));

  render(
    <Provider store={store}>
      <Notifications/>
    </Provider>
  );

  expect(screen.queryByTestId('notifications')).toBeDefined();
  expect(screen.queryByTestId('notifications:icon')).toBeDefined();
  expect(screen.queryByTestId('notifications:unread-count')).toBeDefined();
  expect(screen.queryByText('1')).toBeDefined();
});

test('displays correctly when open and containing unread notifications', () => {
  store.dispatch(notificationsActions.addMessage({
    text: 'mock-text',
    route: 'mock-route',
  }));

  render(
    <Provider store={store}>
      <Notifications/>
    </Provider>
  );

  const notificationsIcon = screen.getByTestId('notifications:icon');
  userEvent.click(notificationsIcon, new MouseEvent('click'));

  expect(screen.queryByTestId('notifications:icon')).toBeDefined();

  expect(screen.queryByTestId('notifications:unread-count')).toBeDefined();
  expect(screen.queryByText('1')).toBeDefined();

  expect(screen.queryByTestId('notifications:messages')).toBeDefined();
  expect(screen.queryByTestId('notifications:message-1')).toBeDefined();
  expect(screen.queryByText('mock-text')).toBeDefined();
});