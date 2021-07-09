import * as React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import styled from '@emotion/styled';

interface DataRetrievalSpinnerProps {
  loadingText: string;
}

const DataRetrievalSpinner: React.FC<DataRetrievalSpinnerProps> = (props: DataRetrievalSpinnerProps) => {
  return (
    <SpinnerWrapper>
      <div style={{marginBottom: '1rem'}}>{props.loadingText}</div>
      <PulseLoader size={4} color={'#555555'}/>
    </SpinnerWrapper>
  )
}

const SpinnerWrapper = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default DataRetrievalSpinner;