enum PersonnelType {
  PLAYER = 1
  // Add more here later
}

export enum StatType {
  REGULAR = 'regular',
  PLAYOFF = 'playoff'
}

export interface PlayerStatsParameters {
  playerKey: string;
  statType: StatType;
}

export interface PersonnelState {
  isFetchingBioData: boolean;
  isFetchingStats: boolean;
  key?: string;
  type?: PersonnelType;
  bioData?: PlayerPersonnel;
  statsData?: Stats;
}

export interface Stats {
  regular: SortedStats;
  playoff: SortedStats;
}

export interface PlayerPersonnel {
  firstName: string;
  lastName: string;
  birthYear: number; 
  birthDay: number;
  birthMonth: number;
  birthDayOfWeek: number;
  birthCity: string;
  birthCountry: string;
  imgURL: string;
  heightIN: number;
  weightLBS: number;
  jerseyNumber: number;
  isRookie: boolean;
  position: string;
  teamCode: string;
}

export interface SortedStats {
  cumulative: StatsDetails[];
  perGame: StatsDetails[];
}

export interface StatsDetails {
  season: string;
  stats: any;
}