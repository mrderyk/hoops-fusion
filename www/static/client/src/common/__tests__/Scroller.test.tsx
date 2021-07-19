import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Scroller from '../components/Scroller';

test('displays the contents in the scroller', () => {
  render(
    <Scroller itemHeight={500}>
      <div style={{height: '500px'}}>Sample Content 1</div>
      <div style={{height: '750px'}}>Sample Content 2</div>
      <div style={{height: '200px'}}>Sample Content 3</div>
    </Scroller>
  );

  expect(screen.getByText('Sample Content 1')).toBeDefined();
  expect(screen.getByText('Sample Content 2')).toBeDefined();
  expect(screen.getByText('Sample Content 2')).toBeDefined();
});