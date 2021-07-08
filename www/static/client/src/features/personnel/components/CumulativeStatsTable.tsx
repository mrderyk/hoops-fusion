import * as React from 'react';
import styled from '@emotion/styled';
import { StatsDetails } from '../types';
import ContentWrapper from '../../../common/components/ContentWrapper';
import FocusedContentHeader from '../../header/components/FocusedContentHeader';

export interface CumulativeStatsTableProps {
  stats: StatsDetails[];
}

const CumulativeStatsTable: React.FC<CumulativeStatsTableProps> = (props: CumulativeStatsTableProps) => {
  return (
    <ContentWrapper>
      <TableTitle>Cumulative Stats</TableTitle>
      <Table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Season</th>
            <th>GP</th>
            <th>GS</th>
            <th>MIN</th>
            <th>FG</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>FG2</th>
            <th>FG2A</th>
            <th>FG2%</th>
            <th>FG3</th>
            <th>FG3A</th>
            <th>FG3%</th>
            <th>FT</th>
            <th>FTA</th>
            <th>FT%</th>
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
                <tr key={`${s.season}:cumulative`}>
                  <td key={`${s.season}:cumulative:season`}>{s.season}</td>
                  <td key={`${s.season}:cumulative:gp`}>{stats.gp}</td>
                  <td key={`${s.season}:cumulative:gs`}>{stats.gs}</td>
                  <td key={`${s.season}:cumulative:min`}>{stats.min}</td>
                  <td key={`${s.season}:cumulative:fgm`}>{stats.fgm}</td>
                  <td key={`${s.season}:cumulative:fga`}>{stats.fga}</td>
                  <td key={`${s.season}:cumulative:fgpct`}>{stats.fgpct.toFixed(1)}</td>
                  <td key={`${s.season}:cumulative:fg2m`}>{stats.fg2m}</td>
                  <td key={`${s.season}:cumulative:fg2a`}>{stats.fg2a}</td>
                  <td key={`${s.season}:cumulative:fg2pct`}>{stats.fg2pct.toFixed(1)}</td>
                  <td key={`${s.season}:cumulative:fg3m`}>{stats.fg3m}</td>
                  <td key={`${s.season}:cumulative:fga3`}>{stats.fg3a}</td>
                  <td key={`${s.season}:cumulative:fg3pct`}>{stats.fg3pct.toFixed(1)}</td>
                  <td key={`${s.season}:cumulative:ftm`}>{stats.ftm}</td>
                  <td key={`${s.season}:cumulative:fta`}>{stats.fta}</td>
                  <td key={`${s.season}:cumulative:ftpct`}>{stats.ftpct.toFixed(1)}</td>
                  <td key={`${s.season}:cumulative:reb`}>{stats.reb}</td>
                  <td key={`${s.season}:cumulative:oreb`}>{stats.oreb}</td>
                  <td key={`${s.season}:cumulative:dreb`}>{stats.dreb}</td>
                  <td key={`${s.season}:cumulative:ast`}>{stats.ast}</td>
                  <td key={`${s.season}:cumulative:stl`}>{stats.stl}</td>
                  <td key={`${s.season}:cumulative:blk`}>{stats.blk}</td>
                  <td key={`${s.season}:cumulative:tov`}>{stats.tov}</td>
                  <td key={`${s.season}:cumulative:foulp`}>{stats.foulp}</td>
                  <td key={`${s.season}:cumulative:pts`}>{stats.pts}</td>
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

export default CumulativeStatsTable;