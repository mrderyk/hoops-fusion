import { createAsyncThunk } from '@reduxjs/toolkit';

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