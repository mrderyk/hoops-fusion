import * as React from 'react';
import { StatsDetails } from '../types';
import StatsTable from './StatsTable';

export interface CumulativeStatsTableProps {
  stats: StatsDetails[];
}

const CumulativeStatsTable: React.FC<CumulativeStatsTableProps> = (props: CumulativeStatsTableProps) => {
  const cellValues = props.stats.map((s) => {
    const stats = s.stats;
    return [
        s.season,
        stats.gp,
        stats.gs,
        stats.min,
        stats.fgm,
        stats.fga,
        stats.fgpct.toFixed(1),
        stats.fg2m,
        stats.fg2a,
        stats.fg2pct.toFixed(1),
        stats.fg3m,
        stats.fg3a,
        stats.fg3pct.toFixed(1),
        stats.ftm,
        stats.fta,
        stats.ftpct.toFixed(1),
        stats.reb,
        stats.oreb,
        stats.dreb,
        stats.ast,
        stats.stl,
        stats.blk,
        stats.tov,
        stats.foulp,
        stats.pts
    ];
  });
  return <StatsTable title={'Cumulative Stats'} columnHeaders={HEADERS} cellValues={cellValues}/>
};

const HEADERS = [
  'Season',
  'GP',
  'GS',
  'MIN',
  'FG',
  'FGA',
  'FG%',
  'FG2',
  'FG2A',
  'FG2%',
  'FG3',
  'FG3A',
  'FG3%',
  'FT',
  'FTA',
  'FT%',
  'REB',
  'OREB',
  'DREB',
  'AST',
  'STL',
  'BLK',
  'TOV',
  'PF',
  'PTS'
];

export default CumulativeStatsTable;