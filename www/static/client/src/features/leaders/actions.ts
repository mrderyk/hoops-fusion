import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryToDisplayText from './categoryToDisplayText';
import { Mode } from './types';

async function fetchLatestFromAPI() {
  const response = await fetch('/leaders');
  const body = await response.json();
  return body
};

export const fetchLatest = createAsyncThunk(
  'leaders/fetchLatestStatus',
  async () => {
    const response = await fetchLatestFromAPI();
    return response;
  }
)

async function fetchLeaderboardAdditionFromAPI(playerKey: string, category: string, season: string, type: string) {
  const response = await fetch(`/leaders/add/${playerKey}?category=${category}&season=${season}&type=${type}`);
  const body = await response.json();
  return body;
}

export const fetchLeaderboardAddition = createAsyncThunk(
  'leaders/fetchLeaderboardAddtion',
  async (addToLeaderboardParams: any) => {
    const { type, playerKey, category } = addToLeaderboardParams;
    // TODO: Compute a default value so we don't have to change this yearly.
    const season = addToLeaderboardParams.season || '2020-2021';
    const response = await fetchLeaderboardAdditionFromAPI(playerKey, findServerCategoryKey(category), season, type === Mode.REGULAR ? 'regular' : 'playoff');
    return response;
  }
)

function findServerCategoryKey(displayText: string) {
  return Object.keys(categoryToDisplayText).find(key => categoryToDisplayText[key] === displayText);
}