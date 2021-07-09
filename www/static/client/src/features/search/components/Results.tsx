import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import {
  EntryProps,
  EntryWrapperProps,
  FormattedLabelProps,
  PhotoProps,
  ResultsProps,
  ResultProps,
  SearchType
} from '../types';
import { searchActions } from '../searchSlice';
import { useAppDispatch } from 'src/common/hooks';

const Results: FC<ResultsProps> = (props: ResultsProps): ReactElement => {
  const players = props.players;
  const type = props.type || SearchType.DEFAULT;
  const playersResults = (
    <div>
      { 
        players.map((player: ResultProps, index: number) => {
          return (
            <Entry 
              isSelected={index == props.selectedResultIndex}
              key={`result:${player.key}`}
              imgURL={player.imgURL}
              label={player.label.toLowerCase()}
              searchString={props.searchString.toLowerCase()}
              playerKey={player.key}
              type={props.type}
              onSelect={props.onSelectResult}
            />
          )	
        }) 
      }
    </div>

  );

  let wrapperMaxWidth: string;
  let wrapperWidth: string;

  switch(props.type) {
    case SearchType.MINI:
      wrapperMaxWidth = '400px';
      wrapperWidth = '100%';
      break;
    case SearchType.MICRO:
      wrapperMaxWidth = 'none';
      wrapperWidth = '100%';
      break;
    default:
      wrapperMaxWidth = '600px';
      wrapperWidth = '100%';
  }

  return (
    <Wrapper style={{maxWidth: wrapperMaxWidth, width: wrapperWidth}}>
      {playersResults}
    </Wrapper>
  )
}

const Entry: FC<EntryProps> = (props: EntryProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { imgURL, playerKey, label, searchString } = props;
  const matchStartIndex = label.indexOf(searchString);
  const strBeforeMatch = label.split('').splice(0, matchStartIndex).join('');
  const strAfterMatch = label
    .split('')
    .splice(matchStartIndex + searchString.length, label.length)
    .join('');


  const defaultOnSelect = (e) => {
    history.push(`/player/${playerKey}`);
  };
  const onSelect = props.onSelect || defaultOnSelect;
  const history = useHistory();

  return (
    <EntryWrapper type={props.type} isSelected={props.isSelected} onClick={(e) => { 
      onSelect(playerKey) 
      }}>
      {
         (
          <PhotoWrapper>
            <Photo imgURL={imgURL}/>
          </PhotoWrapper>
        )
      }
      <FormattedLabel searchString={searchString} strBeforeMatch={strBeforeMatch} strAfterMatch={strAfterMatch}/>
    </EntryWrapper>
  )
};

const FormattedLabel: FC<FormattedLabelProps> = (props: FormattedLabelProps): ReactElement => {
  const { searchString, strBeforeMatch, strAfterMatch } = props;
  const beforeMatch = strBeforeMatch ? <span style={{whiteSpace: 'pre'}}>{strBeforeMatch.toUpperCase()}</span> : undefined;
  const match = <span style={{fontWeight: 600}}>{searchString.toUpperCase()}</span>
  const afterMatch = strAfterMatch ? <span style={{whiteSpace: 'pre'}}>{strAfterMatch.toUpperCase()}</span> : undefined;

  return (
    <FormattedLabelWrapper>
      {beforeMatch}{match}{afterMatch}
    </FormattedLabelWrapper>
  )
};

const Wrapper = styled.div`
  background: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 6px 4px 4px rgb(0 0 0 / 20%);
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
`;

const EntryWrapper = styled.div`
  background-color: ${(props: EntryWrapperProps) => props.isSelected ? 'rgba(245,188,66, 0.8)' : 'rgb(255,255,255)'};
  box-sizing: border-box;
  display: flex;
  font-size: ${(props: EntryWrapperProps) => props.type === SearchType.MICRO ? '10' : '14'}px;
  height: 40px;
  padding: 4px;
  width: 100%; 

  &:hover {
    background-color: rgba(245,188,66, 0.8);
    cursor: pointer;
  }
`;

const FormattedLabelWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  line-height: 32px;
`;

const PhotoWrapper = styled.div`
  flex-grow: 0;
  height: 32px;
  margin-right: 10px;
  width: 40px;
`;

const Photo = styled.div`
  background-color: rgba(255, 255, 255, 1.0);
  background-image: url(${(props: PhotoProps) => props.imgURL });
  background-size: 43.8px 32px;
  background-position: center top;
  border-radius: 50%;
  height: 32px;
  margin: 0 4px;
  width: 32px;
`;

export default Results