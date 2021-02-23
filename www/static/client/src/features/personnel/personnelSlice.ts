import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PersonnelState, PlayerStatsParameters, StatType } from './types';
import * as moment from 'moment';
import Stats from './components/Stats';

const initialState: PersonnelState = { 
  isFetchingBioData: false,
  isFetchingStats: false,
  statsData: {
    playoff: {
      cumulative: [],
      perGame: [],
    },
    regular: {
      cumulative: [],
      perGame: []
    }
  }
}

const fetchPlayerByKeyFromAPI = async (key: string) => {
  const response = await fetch(`/personnel/player/${key}`);
  const body = await response.json();
  return body
}

const fetchPlayerByKey = createAsyncThunk(
  'player/fetchPlayerByKey',
  async (key: string) => {
    const response = await fetchPlayerByKeyFromAPI(key);
    return response;
  }
);

const fetchPlayerStatsByKeyFromAPI = async (key: string, statType: StatType) => {
  const response = await fetch(`/stats/player/${key}/${statType.valueOf()}`);
  const body = await response.json();
  return body
}

const fetchPlayerStatsByKey = createAsyncThunk(
  'player/fetchPlayerStatsByKey',
  async (statsParams: PlayerStatsParameters) => {
    const { playerKey, statType } = statsParams;
    const response = await fetchPlayerStatsByKeyFromAPI(playerKey, statType);
    return response;
  }
);

export const personnelSlice = createSlice({
  name: 'personnel',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Player Bio Data
    builder.addCase(fetchPlayerByKey.pending, (state, action) => {
      state.isFetchingBioData = true;
    });
    builder.addCase(fetchPlayerByKey.fulfilled, (state, action) => {
      state.isFetchingBioData = false;
      const playerData = action.payload;

      if (playerData) { 
        const dob = moment(playerData.dob).parseZone();
        state.bioData = {
          birthCity: playerData.birth_city,
          birthCountry: playerData.birth_country,
          birthDay: dob.date(),
          birthMonth: dob.month(),
          birthYear: dob.year(),
          birthDayOfWeek: dob.day(),
          firstName: playerData.first_name,
          lastName: playerData.last_name,
          heightIN: playerData.height,
          weightLBS: playerData.weight,
          isRookie: playerData.is_rookie,
          jerseyNumber: playerData.number,
          position: playerData.position,
          teamCode: playerData.team_name,
          imgURL: playerData.img_url
        }
      } else {
        state.bioData = undefined;
      }
      
    });
    builder.addCase(fetchPlayerByKey.rejected, (state, action) => {
      state.isFetchingBioData = false;
    });

    // Fetch Player Stats
    builder.addCase(fetchPlayerStatsByKey.pending, (state, action) => {
      state.isFetchingStats = true;
    });
    builder.addCase(fetchPlayerStatsByKey.fulfilled, (state, action) => {
      state.isFetchingStats = false;
      if (action.payload) {
        state.statsData.playoff.cumulative = action.payload.stats.playoff.cumulative || [];
        state.statsData.playoff.perGame = action.payload.stats.playoff.per_game || [];
        state.statsData.regular.cumulative = action.payload.stats.regular.cumulative;
        state.statsData.regular.perGame = action.payload.stats.regular.per_game;
      } else {
        state.statsData = undefined
      }
    });
    
    builder.addCase(fetchPlayerStatsByKey.rejected, (state, action) => {
      state.isFetchingStats = false;
    });
  }
});

export const personnelActions = {
  ...personnelSlice.actions,
  fetchPlayerByKey,
  fetchPlayerStatsByKey,
}

export default personnelSlice.reducer;