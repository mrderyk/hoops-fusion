import * as React from 'react';
import { FC, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../../common/types';
import { useAppDispatch } from '../../../common/hooks';
import { fetchLatest } from '../actions';
import Leaderboards from './Leaderboards';
import SubContentHeader from '../../header/components/SubContentHeader';
import DataRetrievalSpinner from '../../../common/components/DataRetrievalSpinner';
import Switcher from '../../../common/components/Switcher';
import { Mode } from '../types';
import { leadersActions } from '../leadersSlice';


const Leaders: FC = (): ReactElement => {
  const state = useSelector((state: RootState) => state.leaders)
  const dispatch = useAppDispatch();
  let content;

  useEffect(() => {
    dispatch(fetchLatest());
  }, [state.season]);

  if (state.isFetching) {
    content = <DataRetrievalSpinner loadingText={'RETRIEVING LEAGUE LEADERS'}/>;
  } else {
    content = state.mode === Mode.REGULAR ? 
      <Leaderboards type={Mode.REGULAR} leadersByCategory={state.regularSeasonLeaders} /> :
      <Leaderboards type={Mode.PLAYOFF} leadersByCategory={state.playoffLeaders} />
  }

  return (
    <div>
      <SubContentHeader>{state.season} SEASON LEADERS</SubContentHeader>
      <div style={{marginBottom: '1rem'}}>
        <Switcher
          selectedIndex={state.mode === Mode.REGULAR ? 0 : 1}
          labels={['REGULAR SEASON', 'PLAYOFFS']}
          onSelect={selectedIndex => { dispatch(leadersActions.switchMode()) }}
        />
      </div>
      {content}
    </div>
  )
}

export default Leaders;