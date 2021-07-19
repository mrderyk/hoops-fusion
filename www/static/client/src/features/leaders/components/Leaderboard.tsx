import * as React from 'react';
import { FC, ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import { LeagueLeader, Mode } from '../types';
import LeaderboardEntry from './LeaderboardEntry';
import Search from '../../search/components/Search';
import { SearchType } from 'src/features/search/types';
import { useAppDispatch } from '../../../common/hooks';
import { fetchLeaderboardAddition } from '../actions'

interface LeaderboardProps {
  category: string;
  leaders: LeagueLeader[];
  type: Mode
}

const Leaderboard: FC<LeaderboardProps> = (props: LeaderboardProps): ReactElement => {
  const dispatch = useAppDispatch();
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
    <div>
      <Wrapper>
        <HeaderWrapper>{props.category.toUpperCase()}</HeaderWrapper>
        <Content>
          {leaders}
          <Search
            id={uuid()}
            type={SearchType.MICRO}
            onSelectResult={(resultKey) => {
              dispatch(
                fetchLeaderboardAddition({
                  type: props.type,
                  playerKey: resultKey,
                  category: props.category
                })
              );
            }}
            placeholder={'Compare a player...'}
            style={{ border: '1px solid rgba(0,0,0,0.3)'}}
          />
        </Content>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  background-color: rgb(255,255,255);
  border: 1px solid #cccccc;
  box-sizing: border-box;
  min-width: 280px;
  padding-bottom: 10px;
`;

const HeaderWrapper = styled.div`
  background-color: rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.2);
  font-family: 'Heebo', sans-serif;
  font-size: 12px;
  font-weight: 400;
  padding: 0.4rem;
  margin-bottom: 6px;
`;

const Content = styled.div`
  padding: 0 0.4rem;
`;

export default Leaderboard;