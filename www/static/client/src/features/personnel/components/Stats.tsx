import * as React from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../../common/types';
import { useAppDispatch } from '../../../common/hooks';
import SubContentHeader from '../../header/components/SubContentHeader';
import RegularSeasonStats from './RegularSeasonStats';
import { Stats } from '../types';


const Stats: React.FC<Stats> = (props: Stats) => {
  const state = useSelector((state: RootState) => state.personnel.statsData);
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <SubContentHeader>CAREER STATS</SubContentHeader>
      <RegularSeasonStats stats={props.regular} />
    </div>
   );
}

export default Stats;