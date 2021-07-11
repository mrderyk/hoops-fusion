import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import ContentWrapper from '../../../common/components/ContentWrapper';

export interface StatsTableProps {
  title: string;
  columnHeaders: string[];
  cellValues: string[][];
}

const StatsTable: React.FC<StatsTableProps> = (props: StatsTableProps) => {
  const seasonHeaderRef = useRef();
  const thSpacerRef = useRef();
  const tableUUID = uuid();

  // For *now*, stats tables always have only the first column sticky (this is the season column).
  // TODO: Refactor this later to allow for more columns to be sticky.
  const stickyHeaderValues = props.columnHeaders.slice(0,1);
  const stickyCellValues = props.cellValues.map((c) => {
    return c.slice(0,1);
  });
  const nonStickyHeaderValues = props.columnHeaders.slice(1);
  const nonStickyCellValues = props.cellValues.map((c) => c.slice(1));

  useLayoutEffect(() => {
    const thSpacerRefEl = thSpacerRef.current as any;
    const stickyColumnWidth = seasonHeaderRef.current && (seasonHeaderRef.current as any).clientWidth;
    if (stickyColumnWidth && thSpacerRefEl) {
      thSpacerRefEl.style.width = stickyColumnWidth;
      thSpacerRefEl.style.minWidth = stickyColumnWidth;
    }
  }, []);

  return (
    <ContentWrapper>
      <TableTitle>{props.title}</TableTitle>
      <div style={{position: 'relative'}}>
        <div style={{overflowX: 'auto'}}>
          <Table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th ref={thSpacerRef}></th>
                { nonStickyHeaderValues.map((c) => <th>{c}</th>) }
              </tr>
            </thead>
            <tbody>
              {
                nonStickyCellValues.map((cellValuesForRow) => {
                  return (
                    <tr>
                      <td></td>
                      { cellValuesForRow.map((cellValue) =><td>{cellValue}</td>)}
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <Table cellPadding={0} cellSpacing={0} style={{
              left: 0,
              position: 'absolute',
              top: 0,
              width: 'initial'
            }}
          >
            <thead>
              <tr>
                { 
                  // TODO: Accept more refs later on.
                  // For now we only use one ref, since we only support one column header.
                  stickyHeaderValues.map((s) => <th ref={seasonHeaderRef}>{s}</th>) 
                }
              </tr>
            </thead>
            <tbody>
              {
                stickyCellValues.map((cellValues) => {
                  return (
                    <tr>
                      { cellValues.map((c) => <td>{c}</td>) }
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </ContentWrapper>
   );
}

const TableTitle = styled.div`
  font-size: 12px;
  margin-bottom: .5rem;
  text-decoration: underline;
`;

const Table = styled.table`
  background-color: #ffffff;
  border: 1px solid rgba(0,0,0,.2);
  font-size: 10px;
  position: relative;
  width: 100%;

  th:first-child, td:first-child {
    border-left: none;
  }

  td {
    background-color: #ffffff;
  }

  th {
    background-color: #dedede;
    font-weight: 600;
  }

  th, td {
    border-left: 1px solid rgba(0,0,0,.2);
    border-bottom: 1px solid rgba(0,0,0,.2);
    box-sizing: border-box;
    padding: 2px 4px;
    text-align: center;
  }
  
  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    td {
      background-color: #f1e6db;
    }
  }

  tr:hover, tr:nth-child(even):hover {
    td {
      background-color: #ffd7aa;
    }
    td:hover {
      background-color: ffc788;
      cursor: pointer;
    }
  }
`;

export default StatsTable;