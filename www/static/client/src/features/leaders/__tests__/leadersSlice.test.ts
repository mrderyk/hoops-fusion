import { AnyAction } from 'redux';
import reducer from '../leadersSlice';
import * as leadersActions from '../actions';

const initialState = {
  season: '2020-2021',
  playoffLeaders: [],
  regularSeasonLeaders: [],
  isFetching: false,
};

test('should return the initial state', () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
});

test('should be able to retrieve the latest regular season leaders', () => {
  const pendingAction = {
    type: leadersActions.fetchLatest.pending.type
  };
  const fulfilledAction = {
    type: leadersActions.fetchLatest.fulfilled.type,
    payload: {
      playoff: [],
      regular: [{
        category: 'min',
        leaders:[{
          player_info: {
            full_name: 'mock-full-name',
            img_url: 'mock-image-url',
            key: 'mock-key',
            team: 'mock-team'
          },
          stat: 123
        }]
      }]
    },
  };
  const rejectedAction = {
    type: leadersActions.fetchLatest.rejected.type
  };

  expect(reducer(initialState, pendingAction)).toEqual({
    ...initialState,
    isFetching: true
  });

  expect(reducer({
      ...initialState
    }, fulfilledAction)).toMatchObject({
    regularSeasonLeaders: [{
      category: 'minutes',
      leaders: [{
          fullName: 'mock-full-name',
          imgURL: 'mock-image-url',
          teamCode: 'mock-team',
          stat: 123,
          playerKey: 'mock-key',
       }],
      },
    ]
  });

  expect(reducer({...initialState, isFetching: true}, rejectedAction)).toEqual({
    ...initialState,
    isFetching: false
  });
});

test('should be able to retrieve data for an comparison addition to the leaderboard', () => {
  const pendingAction = {
    type: leadersActions.fetchLeaderboardAddition.pending.type
  };
  const fulfilledAction = {
    type: leadersActions.fetchLeaderboardAddition.fulfilled.type,
    payload: {
      category: 'min',
      player: {
        player: {
          birth_city: 'mock-city',
          birth_country: 'mock-country',
          dob: 'Sun, 13 Mar 1988 00:00:00 GMT',
          first_name: 'mock-first-name',
          last_name: 'mock-last-name',
          height: 75,
          id: 1234,
          img_url: 'mock-image-url-2',
          is_rookie: false,
          key: 'mock-key-2',
          number: 1,
          position: 'mock-position',
          team_name: 'mock-team-2',
          weight: 123
        },
        stat: 1234
      }
    },
  };
  const rejectedAction = {
    type: leadersActions.fetchLeaderboardAddition.rejected.type
  };
  const stateWithLeaders = {
    ...initialState,
    regularSeasonLeaders:[{
      category: 'minutes',
      leaders: [{
        fullName: 'mock-full-name',
        imgURL: 'mock-image-url',
        teamCode: 'mock-team',
        stat: 4321,
        playerKey: 'mock-key',
      }]
    }] 
  }

  expect(reducer(stateWithLeaders, fulfilledAction)).toEqual({
    ...initialState,
    regularSeasonLeaders: [{
      category: 'minutes',
      leaders: [{
        fullName: 'mock-full-name',
        imgURL: 'mock-image-url',
        teamCode: 'mock-team',
        stat: 4321,
        playerKey: 'mock-key',
      }, {
        fullName: 'mock-first-name mock-last-name',
        imgURL: 'mock-image-url-2',
        playerKey: 'mock-key-2',
        stat: 1234,
        teamCode: 'mock-team-2',
      }],
      },
    ]
  });
});
