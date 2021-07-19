import * as React from 'react';
import { StatsDetails } from '../types';
import StatsTable from './StatsTable';

// TODO: DRY this up with CumulativeStatsTable
export interface PerGameStatsTableProps {
  stats: StatsDetails[];
}

const HEADERS = [
  'Season',
  'MIN',
  'FG',
  'FGA',
  'FG2',
  'FG2A',
  'FG3',
  'FG3A',
  'FT',
  'FTA',
  'REB',
  'OREB',
  'DREB',
  'AST',
  'STL',
  'BLK',
  'TOV',
  'PF',
  'PTS',
];

const PerGameStatsTable: React.FC<PerGameStatsTableProps> = (props: PerGameStatsTableProps) => {
  const cellValues = props.stats.map((s) => {
    const stats = s.stats;
    return [
      s.season,
      stats.minpg.toFixed(1),
      stats.fgmpg.toFixed(1),
      stats.fgapg.toFixed(1),
      stats.fg2mpg.toFixed(1),
      stats.fg2apg.toFixed(1),
      stats.fg3mpg.toFixed(1),
      stats.fg3apg.toFixed(1),
      stats.ftmpg.toFixed(1),
      stats.ftapg.toFixed(1),
      stats.rebpg.toFixed(1),
      stats.orebpg.toFixed(1),
      stats.drebpg.toFixed(1),
      stats.astpg.toFixed(1),
      stats.stlpg.toFixed(1),
      stats.blkpg.toFixed(1),
      stats.tovpg.toFixed(1),
      stats.foulppg.toFixed(1),
      stats.ptspg.toFixed(1),
    ];
  })
  return <StatsTable title={'Per Game Stats'} columnHeaders={HEADERS} cellValues={cellValues}/>;
};

export default PerGameStatsTable;