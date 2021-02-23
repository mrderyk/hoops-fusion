import requests


STATS_API_URL_ROOT = 'http://0.0.0.0:5000/stats'
REGULAR_SEASON_API_PATH = 'regular'
PLAYOFF_API_PATH = 'playoff'


def get_regular_season_stats_by_player_key(player_key):
  url = '{r}/{p}/player/{k}'.format(r=STATS_API_URL_ROOT, p=REGULAR_SEASON_API_PATH, k=player_key)
  
  r = requests.get(url)
  return [r.json()]