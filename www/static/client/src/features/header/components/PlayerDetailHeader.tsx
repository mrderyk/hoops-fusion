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
        <FirstNameWrapper>{props.firstName.toUpperCase()}</FirstNameWrapper>
        <LastNameWrapper>{props.lastName.toUpperCase()}</LastNameWrapper>
      </NameWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background-color: rgb(59, 74, 97);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: .5em 0;
  width: 100%;
`;

const PhotoWrapper = styled.div`
  color: rgb(255, 255, 255);
  flex-grow: 0;
  padding-left: 0.3em;
  padding-right: .7em;
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
  margin: 5px 10px;
  width: 125px;
`;

const NameWrapper = styled.div`
  align-items: center;
  color: rgb(255, 255, 255);
  flex-grow: 1;
  padding-left: 0.3em;
  padding-right: .7em;
`;

const FirstNameWrapper = styled.div`
  box-sizing: border-box;
  font-size: 30px;
  height: 45px;
  line-height: 30px;
  padding-left: 4px;
  padding-top: 15px;
`;

const LastNameWrapper = styled.div`
  box-sizing: border-box;
  font-size: 80px;
  font-weight: 600;
  height: 90px;
  line-height: 75px;
`;

const SearchWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding-left: .3em;
`;

export default PlayerDetailHeader;