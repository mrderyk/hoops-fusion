import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import MainHeader from '../features/header/components/MainHeader';
import Leaders from '../features/leaders/components/Leaders';
import MenuBar from 'src/features/menubar/components/MenuBar';

export const App: FC = (): ReactElement => {
  return (
    <div>
      <MainHeader />
      <Leaders />
    </div>
  )
}