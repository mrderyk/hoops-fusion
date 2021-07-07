import * as React from 'react';

export interface EntryProps {
  imgURL: string;
  playerKey: string;
  label: string;
  searchString: string;
  isSelected: boolean;
  type?: SearchType;
  onSelect?: (e: any) => void;
}

export interface EntryWrapperProps {
  isSelected: boolean;
}

export interface FormattedLabelProps {
  searchString: string;
  strBeforeMatch: string;
  strAfterMatch: string;
}

export interface PhotoProps {
  imgURL: string;
}

export interface ResultProps {
  label: string;
  imgURL: string;
  key: string;
}

export interface ResultsProps extends SearchResultsState {
  selectedResultIndex: number;
  searchString: string;
  type?: SearchType;
  onSelectResult?: (e: any) => void;
}

export interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  searchType: SearchType;
  searchID: string;
}

export interface SearchProps {
  type: SearchType;
  id: string;
  onSelectResult?: (e: any) => void;
}

export interface SearchResultsState { 
  players?: ResultProps[],
  teams?: ResultProps[],
  etc?: ResultProps
}

export interface SearchState {
  query: string;
  searchResults?: SearchResultsState;
  isFetching: boolean;
  selectedResultIndex: number;
  activeSearchId?: string;
}

export enum SearchType {
  DEFAULT = 1,
  MINI = 2,
  MICRO = 3
}
