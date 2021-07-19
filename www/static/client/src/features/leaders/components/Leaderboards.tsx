import * as React from 'react';
import { FC, ReactElement, useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Leaderboard from './Leaderboard';
import ContentWrapper from '../../../common/components/ContentWrapper';
import Scroller from '../../../common/components/Scroller';
import { LeaderboardsProps } from '../types';

const Leaderboards: FC<LeaderboardsProps> = (props: LeaderboardsProps): ReactElement => {
  const leaders = props.leadersByCategory;

  return (
    <ContentWrapper>
      <Scroller style={scrollerStyle} itemHeight={515}>
        {
          leaders.map((r) => (
            <Leaderboard type={props.type} key={`leaderboard:${uuid()}`} category={r.category} leaders={r.leaders}/>
          ))
        }
      </Scroller>
    </ContentWrapper>
  )
}

const scrollerStyle = {
  display: 'grid',
  gridAutoRows: 'min-content',
  gridColumnGap: '20px',
  gridRowGap: '20px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
};

export default Leaderboards;