export interface SearchState {
  query: string;
  searchResults?: SearchResultsState;
  isFetching: boolean;
  selectedResultIndex: number;
}

export interface SearchResultsState { 
  players?: ResultProps[],
  teams?: ResultProps[],
  etc?: ResultProps
}

export interface ResultProps {
  label: string;
  imgURL: string;
  key: string;
}

export interface ResultsProps extends SearchResultsState {
  selectedResultIndex: number;
  searchString: string;
  isMicro: boolean;
}