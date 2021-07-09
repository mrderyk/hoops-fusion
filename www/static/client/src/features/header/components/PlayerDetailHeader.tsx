import * as React from 'react';
import { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { PlayerPersonnel } from '../../personnel/types';

const PlayerDetailHeader: FC<PlayerPersonnel> = (props: PlayerPersonnel): ReactElement => {
  return (
    <ContentWrapper>
      <PhotoWrapper>
        <Photo imgURL={props.imgURL} />
      </PhotoWrapper>
      <NameWrapper>
        <div style={{overflow: 'hidden'}}>
          <FirstNameWrapper>{props.firstName.toUpperCase()}</FirstNameWrapper>
          <LastNameWrapper>{props.lastName.toUpperCase()}</LastNameWrapper>
        </div>
      </NameWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background-color: #333;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: .5em 0;
  width: 100%;
`;

const PhotoWrapper = styled.div`
  color: rgb(255, 255, 255);
  flex-grow: 0;
  padding-left: 1rem;
`;

interface PhotoWrapperProps {
  imgURL: string;
}

const Photo = styled.div`
  background-color: rgba(255, 255, 255, 1.0);
  background-image: url(${(props: PhotoWrapperProps) => props.imgURL });
  background-size: 170px 125px;
  background-position: center top;
  border-radius: 50%;
  height: 125px;
  margin: 5px 0;
  width: 125px;
`;

const NameWrapper = styled.div`
  align-items: center;
  display: flex;
  color: rgb(255, 255, 255);
  flex-grow: 1;
  overflow: hidden;
  padding: 0 1rem;
`;

const FirstNameWrapper = styled.div`
  box-sizing: border-box;
  font-size: 20px;
  height: 20px;
  margin-left: 4px;
  width: 100%;

  @media only screen 
    and (min-width: 375px) 
    and (max-width: 667px) { 
      font-size: 20px;
      height: 14px;
  }
`;

const LastNameWrapper = styled.div`
  box-sizing: border-box;
  font-size: 80px;
  font-weight: 600;
  height: 85px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  @media only screen 
    and (min-width: 375px) 
    and (max-width: 667px) { 
      font-size: 52px;
      height: 56px;
  }
`;

const SearchWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding-left: .3em;
`;

export default PlayerDetailHeader;