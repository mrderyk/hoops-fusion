import * as React from 'react';
import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import { LeagueLeader } from '../types';
import LeaderboardEntry from './LeaderboardEntry';

interface LeaderboardProps {
  category: string;
  leaders: LeagueLeader[];
}

const Leaderboard: FC<LeaderboardProps> = (props: LeaderboardProps): ReactElement => {
  const leaders = props.leaders.map((l: LeagueLeader, index: number) => {
    return (
      <LeaderboardEntry
        key={`leaderboardentry:${l.fullName.replace(' ','_')}:${l.stat}`}
        imgURL={l.imgURL}
        fullName={l.fullName}
        teamCode={l.teamCode}
        stat={l.stat}
        place={index}
        leadPercentage={(l.stat/props.leaders[0].stat) * 100}
        playerKey={l.playerKey}
      />
    )
  });

  return (
    <Wrapper>
      <HeaderWrapper>{props.category.toUpperCase()}</HeaderWrapper>
      <Content>
        {leaders}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
  box-sizing: border-box;
  min-width: 280px;
`;

const HeaderWrapper = styled.div`
  background-color: rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.2);
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 0.4rem;
  margin-bottom: 6px;
`;

const Content = styled.div`
  padding: 0 0.4rem;
`;

export default Leaderboard;