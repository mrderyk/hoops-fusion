export interface LeaderboardEntryProps extends LeagueLeader {
  place: number;
  leadPercentage: number;
}

export interface LeadPercentageMeterProps {
  color: string;
  percentage: number;
}

export interface LeagueLeader {
  fullName: string;
  imgURL: string;
  teamCode: string;
  stat: number;
  playerKey: string;
}

export interface CategoryToLeaders {
  category: string;
  leaders: LeagueLeader[];
}

export interface LeadersState {
  season: string;
  playoffLeaders: CategoryToLeaders[];
  regularSeasonLeaders: CategoryToLeaders[];
  isFetching: boolean;
}

export interface PhotoWrapperProps {
  imgURL: string;
}