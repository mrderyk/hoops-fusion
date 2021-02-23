import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../../common/types';
import { useParams } from 'react-router';

import PlayerDetailHeader from '../../header/components/PlayerDetailHeader';
import Stats from '../components/Stats';
import { personnelActions } from '../personnelSlice';
import { useAppDispatch } from '../../../common/hooks';
import MenuBar from '../../menubar/components/MenuBar';
import { StatType } from '../types';

interface PlayerParams {
  key: string
}

const Player = () => {
  const { key } = useParams<PlayerParams>();
  const state = useSelector((state: RootState) => state.personnel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(personnelActions.fetchPlayerByKey(key));

    const fetchParams = {
      playerKey: key,
      statType: StatType.REGULAR
    };

    dispatch(personnelActions.fetchPlayerStatsByKey(fetchParams));
  }, [key]);

  return (
    <div>
      <MenuBar/>
      {
        state.bioData && <PlayerDetailHeader {...state.bioData}/>
      }
      <Stats regular={state.statsData.regular} playoff={state.statsData.playoff} />
    </div>
   );
}

export default Player;