import * as React from 'react';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import { RootState } from '../../../common/types';
import { useAppDispatch } from '../../../common/hooks';
import { fetchLatest } from '../actions';
import Leaderboard from './Leaderboard';
import ContentWrapper from 'src/common/components/ContentWrapper';
import SubContentHeader from '../../header/components/SubContentHeader';


const Leaders: FC = (): ReactElement => {
  const state = useSelector((state: RootState) => state.leaders)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatest());
  }, [state.season]);

  let regularSeasonLeaderboards;
  let playoffLeaderboards;

  if (state.regularSeasonLeaders) {
    regularSeasonLeaderboards = state.regularSeasonLeaders.map((r) => {
      return <Leaderboard key={`leaderboard:${Math.random()}`} category={r.category} leaders={r.leaders}/>
    })
  }


  return (
    <Wrapper>
      <SubContentHeader>{state.season} SEASON LEADERS</SubContentHeader>
      <ContentWrapper>
        <Content>
          {regularSeasonLeaderboards}
        </Content>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div``;
const Content = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

export default Leaders;