import { LeadersState } from '../features/leaders/types';
import { SearchState } from '../features/search/types';
import { PersonnelState } from '../features/personnel/types';

export interface RootState {
  leaders: LeadersState;
  search: SearchState;
  personnel: PersonnelState;
};