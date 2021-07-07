import { createSlice } from '@reduxjs/toolkit';
import { fetchLatest, fetchLeaderboardAddition } from './actions';
import { LeadersState, CategoryToLeaders } from './types';
import categoryToDisplayText from './categoryToDisplayText';

const initialState: LeadersState = {
  season: '2020-2021',
  playoffLeaders: [],
  regularSeasonLeaders: []
};

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatest.pending, (state, action) => {});

    builder.addCase(fetchLatest.fulfilled, (state, action) => {
      const leagueLeaders = action.payload.regular.map((r: any) => {
        return {
          category: categoryToDisplayText[r.category],
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
    });

    builder.addCase(fetchLeaderboardAddition.pending, (state, action) => {});

    builder.addCase(fetchLeaderboardAddition.fulfilled, (state, action) => {
      const leagueLeaders = state.regularSeasonLeaders;
      const leadersForCategoryIndex = state.regularSeasonLeaders.findIndex((l) => l.category == categoryToDisplayText[action.payload.category]);
      const player = action.payload.player.player;
      const leadersForCategory = leagueLeaders[leadersForCategoryIndex];
      const updatedLeadersForCategory = [
        ...leadersForCategory.leaders,
        {
          fullName: `${player.first_name} ${player.last_name}`,
          imgURL: player.img_url,
          teamCode: player.team_name,
          stat: action.payload.player.stat,
          playerKey: player.key,
        }
      ];

      updatedLeadersForCategory.sort((a, b) => b.stat - a.stat);
      leadersForCategory.leaders = updatedLeadersForCategory;
    })
  },
});


export default leadersSlice.reducer;