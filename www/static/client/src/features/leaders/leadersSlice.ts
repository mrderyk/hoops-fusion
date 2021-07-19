import { createSlice } from '@reduxjs/toolkit';
import { fetchLatest, fetchLeaderboardAddition } from './actions';
import { LeadersState, Mode } from './types';
import categoryToDisplayText from './categoryToDisplayText';

const initialState: LeadersState = {
  season: '2020-2021',
  playoffLeaders: [],
  regularSeasonLeaders: [],
  isFetching: false,
  mode: Mode.REGULAR
};

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState: initialState,
  reducers: {
    switchMode: (state: LeadersState) => {
      state.mode = state.mode === Mode.REGULAR ? Mode.PLAYOFF : Mode.REGULAR;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatest.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(fetchLatest.fulfilled, (state, action) => {
      state.isFetching = false;

      state.regularSeasonLeaders = action.payload.regular.map((r: any) => {
        return {
          category: categoryToDisplayText[r.category],
          leaders: r.leaders.map((l: any) => {
            return {
              fullName: l.player_info.full_name,
              imgURL: l.player_info.img_url,
              teamCode: l.player_info.team,
              playerKey: l.player_info.key,
              stat: l.stat
            }
          }),
        }
      });

      state.playoffLeaders = action.payload.playoff.map((p: any) => {
        return {
          category: categoryToDisplayText[p.category],
          leaders: p.leaders.map((l: any) => {
            return {
              fullName: l.player_info.full_name,
              imgURL: l.player_info.img_url,
              teamCode: l.player_info.team,
              playerKey: l.player_info.key,
              stat: l.stat
            }
          }),
        }
      });
    });

    builder.addCase(fetchLatest.rejected, (state, action) => {
      state.isFetching = false;
    });

    builder.addCase(fetchLeaderboardAddition.pending, (state, action) => {});

    builder.addCase(fetchLeaderboardAddition.fulfilled, (state, action) => {
      const leadersKey = action.meta.arg.type === Mode.REGULAR ? 'regularSeasonLeaders' : 'playoffLeaders';
      const leagueLeaders = state[leadersKey];
      const leadersForCategoryIndex = state[leadersKey].findIndex((l) => l.category == categoryToDisplayText[action.payload.category]);
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

export const leadersActions = leadersSlice.actions;

export default leadersSlice.reducer;