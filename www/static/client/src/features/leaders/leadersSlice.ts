import { createSlice } from '@reduxjs/toolkit';
import { fetchLatest } from './actions';
import { LeadersState, CategoryToLeaders } from './types';

const initialState: LeadersState = {
  season: '2020-2021',
  playoffLeaders: [],
  regularSeasonLeaders: []
};

const categoryAbbreviationToDisplayText = {
  min: 'minutes',
  pts: 'points',
  ast: 'assists',
  reb: 'rebounds',
  oreb: 'offensive rebounds',
  dreb: 'defensive rebounds',
  stl: 'steals',
  blk: 'blocks',
  ftm: 'free throws made',
  tov: 'turnovers',
  foulp: 'personal fouls',
  fgm: 'field goals made',
  fg2m: '2pt field goals made',
  fg3m: '3pt field goals made',
  ptspg: 'points / game',
  astpg: 'assists / game',
  rebpg: 'rebounds / game',
  orebpg: 'offensive rebounds / game',
  drebpg: 'defensive rebounds / game',
  stlpg: 'steals / game',
  blkpg: 'blocks / game',
  ftapg: 'free throw attempts / game',
  ftmpg: 'free throws made / game',
  fg3mpg: '3pt field goals made / game',
  tovpg: 'turnovers / game',
  foulppg: 'personal fouls / game',
  fgpct: 'field goal %',
  fg2pct: '2pt field goal %',
  fg3pct: '3pt field goal %',
  ftpct: 'free throw %'

}

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState: initialState,
  reducers: {
    //receivePlayoffLeaders(state, action: PayloadAction<CategoryToLeaders[]>) { },
    //receiveRegularSeasonLeaders(state, action: PayloadAction<CategoryToLeaders[]>) { }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatest.pending, (state, action) => {
    })
    builder.addCase(fetchLatest.fulfilled, (state, action) => {
      const leagueLeaders = action.payload.regular.map((r: any) => {
        return {
          category: categoryAbbreviationToDisplayText[r.category],
          leaders: r.leaders.map((l: any) => {
            return {
              fullName: l.player_info.full_name,
              imgURL: l.player_info.img_url,
              teamCode: l.player_info.team,
              stat: l.stat,
            }
          }),
        }
      })
      state.regularSeasonLeaders = leagueLeaders;
    })
  },
});

//const {receivePlayoffLeaders, receiveRegularSeasonLeaders} = leadersSlice.actions;

export default leadersSlice.reducer;