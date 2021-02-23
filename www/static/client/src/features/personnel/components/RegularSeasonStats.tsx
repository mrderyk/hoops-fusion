import * as React from 'react';
import styled from '@emotion/styled';
import { SortedStats } from '../types';
import FocusedContentHeader from '../../header/components/FocusedContentHeader';
import CumulativeStatsTable from './CumulativeStatsTable';
import PerGameStatsTable from './PerGameStatsTable';

export interface RegularSeasonStatsProps {
  stats: SortedStats;
}

const RegularSeasonStats: React.FC<RegularSeasonStatsProps> = (props: RegularSeasonStatsProps) => {
  return (
    <div>
      <FocusedContentHeader>REGULAR SEASON</FocusedContentHeader>
      <CumulativeStatsTable stats={props.stats.cumulative}/>
      <PerGameStatsTable stats={props.stats.perGame}/>
    </div>
   );
}

export default RegularSeasonStats;