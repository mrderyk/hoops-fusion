import * as React from 'react';
import styled from '@emotion/styled';
import { StatsDetails } from '../types';
import ContentWrapper from '../../../common/components/ContentWrapper';
import FocusedContentHeader from '../../header/components/FocusedContentHeader';

// TODO: DRY this up with CumulativeStatsTable
export interface PerGameStatsTableProps {
  stats: StatsDetails[];
}

const PerGameStatsTable: React.FC<PerGameStatsTableProps> = (props: PerGameStatsTableProps) => {
  return (
    <ContentWrapper>
      <TableTitle>Per-Game Stats</TableTitle>
      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Season</th>
            <th>MIN</th>
            <th>FG</th>
            <th>FGA</th>
            <th>FG2</th>
            <th>FG2A</th>
            <th>FG3</th>
            <th>FG3A</th>
            <th>FT</th>
            <th>FTA</th>
            <th>REB</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {
            props.stats.map((s) => {
              const stats = s.stats;
              return (
                <tr key={`${s.season}:pergame`}>
                  <td key={`${s.season}:pergame:season`}>{s.season}</td>
                  <td key={`${s.season}:pergame:min`}>{stats.minpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fgm`}>{stats.fgmpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fga`}>{stats.fgapg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fg2m`}>{stats.fg2mpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fg2a`}>{stats.fg2apg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fg3m`}>{stats.fg3mpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fga3`}>{stats.fg3apg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:ftm`}>{stats.ftmpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:fta`}>{stats.ftapg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:reb`}>{stats.rebpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:oreb`}>{stats.orebpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:dreb`}>{stats.drebpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:ast`}>{stats.astpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:stl`}>{stats.stlpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:blk`}>{stats.blkpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:tov`}>{stats.tovpg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:foulp`}>{stats.foulppg.toFixed(1)}</td>
                  <td key={`${s.season}:pergame:pts`}>{stats.ptspg.toFixed(1)}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </ContentWrapper>
   );
}

const TableTitle = styled.div`
  font-size: 12px;
  margin-bottom: .5rem;
  text-decoration: underline;
`;

const Table = styled.table`
  background-color: rgb(255,255,255);
  border: 1px solid rgba(0,0,0,.2);
  font-size: 10px;
  width: 100%;

  th:first-child, td:first-child {
    border-left: none;
  }

  th {
    background-color: rgba(0,0,0,0.1);
    font-weight: 600;
  }

  th, td {
    border-left: 1px solid rgba(0,0,0,.2);
    border-bottom: 1px solid rgba(0,0,0,.2);
    border-bottom: 
    box-sizing: border-box;
    padding: 2px 4px;
    text-align: center;
  }

  td:hover {
    background-color: rgba(255, 153, 0, 0.5);
    cursor: pointer;
  }
  
  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 153, 0, 0.1);
  }

  tr:hover, tr:nth-child(even):hover {
    background-color: rgba(255, 153, 0, 0.4);
  }
`;

export default PerGameStatsTable;