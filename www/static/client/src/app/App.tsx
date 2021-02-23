import * as React from 'react';
import { FC, ReactElement } from 'react';
import MainHeader from '../features/header/components/MainHeader';
import Leaders from '../features/leaders/components/Leaders';

export const App: FC = (): ReactElement => {
  const h = <div>AUX CONTENT!</div>;
  return (
    <div>
      <MainHeader />
      <Leaders />
    </div>
  )
}
