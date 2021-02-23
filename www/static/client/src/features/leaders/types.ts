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
}