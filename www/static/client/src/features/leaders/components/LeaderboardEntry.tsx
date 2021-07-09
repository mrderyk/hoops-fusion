import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { LeaderboardEntryProps, LeadPercentageMeterProps, PhotoWrapperProps } from '../types';
import { useHistory } from 'react-router-dom';

const LEADER_PLACE_COLORS: string[] = [
  '#FD2607',
  '#FF8406',
  '#FED530',
  '#FBFF87',
  '#E1FFB4',
  '#C1FFDC',
  '#A7FFFE',
  '#90F1FE',
  '#80DFFE',
  '#73CDFC',
];

const DEFAULT_BG_COLOR = '#DDDDDD';

const LeaderboardEntry: FC<LeaderboardEntryProps> = (props: LeaderboardEntryProps): ReactElement => {
  const history = useHistory();

  return (
    <Wrapper onClick={(e) => {
      history.push(`/player/${props.playerKey}`);
    }}>
      <LeadPercentageMeter percentage={props.leadPercentage} color={LEADER_PLACE_COLORS[props.place] || DEFAULT_BG_COLOR}/>
      <PhotoWrapper>
        <Photo imgURL={props.imgURL}/>
      </PhotoWrapper>
      <NamesWrapper>
        <TeamNameWrapper>{props.teamCode}</TeamNameWrapper>
        <NameWrapper>{props.fullName.toUpperCase()}</NameWrapper>
      </NamesWrapper>
      <StatWrapper>
        <div>{props.stat}</div>
      </StatWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  margin-bottom: 4px;
  position: relative;
`;

const LeadPercentageMeter = styled.div`
  background-color: ${(props: LeadPercentageMeterProps) => props.color };
  height: 40px;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: ${(props: LeadPercentageMeterProps) => props.percentage }%;
  z-index: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 0;
    border-color: rgba(255, 255, 255, 1.0) transparent transparent transparent;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 4px 4px;
    border-color: transparent transparent rgba(255, 255, 255, 1.0) transparent;
  }
`;

const PhotoWrapper = styled.div`
  flex-grow: 0;
  height: 40px;
  margin-right: 10px;
  width: 50px;
  z-index: 1;
`;

const Photo = styled.div`
  background-color: rgba(255, 255, 255, 1.0);
  background-image: url(${(props: PhotoWrapperProps) => props.imgURL });
  background-size: 54.75px 40px;
  background-position: center top;
  border-radius: 50%;
  height: 30px;
  margin: 5px 10px;
  width: 30px;
`;

const NameWrapper = styled.div`
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TeamNameWrapper = styled.div`
  font-size: 10px;
  font-weight: 600;
  height: 15px;
  line-height: 20px;
`;

const NamesWrapper = styled.div`
  flex-grow: 0;
  overflow: hidden;
  z-index: 1;
`;

const StatWrapper = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 35px;
  padding: 5px 20px 0 20px;
  text-align: right;
  z-index: 1;
`;

export default LeaderboardEntry;