import * as React from 'react';
import {v4 as uuid} from 'uuid';
import styled from '@emotion/styled';

interface SwitcherProps {
  labels: string[];
  selectedIndex?: number;
  onSelect: (selectedIndex: number) => void;
}

const Switcher: React.FC<SwitcherProps> = (props: SwitcherProps) => {
  const { labels, selectedIndex } = props;
  const normalizedSelectedIndex = selectedIndex != undefined ? selectedIndex : 0;
  const switcherID = uuid();

  return (
    <Wrapper>
      {
        labels.map((l: string, i: number) => {
          return (
            <Switch 
              isSelected={i === normalizedSelectedIndex}
              key={`switcher:${switcherID}:switch:${i}`}
              onClick={() => {props.onSelect(i)}}>
              {l}
            </Switch>
          );
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex; 
  font-size: 12px;
  font-weight: 600;
  padding: 0 1rem;
  overflow: hidden;
`;

interface SwitchProps {
  isSelected: boolean;
}

const Switch = styled.div`
  background-color: ${(props: SwitchProps) => { return props.isSelected ? '#ffffff': '#bbbbbb'}};
  border: 2px solid #bbbbbb;
  border-left-width: 1px;
  border-right-width: 1px;
  cursor: ${(props: SwitchProps) => { return props.isSelected ? 'auto': 'pointer'}};
  font-size: 12px;
  font-weight: 400;
  padding: .25rem .5rem;

  &:first-child {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
    border-left-width: 2px;
  }

  &:last-child {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
    border-right-width: 2px;
  } 

  &:hover {
    background-color: ${(props: SwitchProps) => { return props.isSelected ? '#ffffff': '#dddddd'}};
  }
`;

export default Switcher;