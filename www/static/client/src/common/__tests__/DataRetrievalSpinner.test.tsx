import * as React from 'react';
import {render, screen} from '@testing-library/react';
import DataRetrievalSpinner from '../components/DataRetrievalSpinner';

test('displays the spinner with the specified loading message', () => {
  render(<DataRetrievalSpinner loadingText='mock-loading-text'/>);

  expect(screen.getByText('mock-loading-text')).toBeDefined();
});