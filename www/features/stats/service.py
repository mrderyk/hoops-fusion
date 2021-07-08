import requests
from www.config import STATS_SERVICE_URL

STATS_API_URL_ROOT = '{url}/stats'.format(url=STATS_SERVICE_URL)
REGULAR_SEASON_API_PATH = 'regular'
PLAYOFF_API_PATH = 'playoff'


def get_regular_season_stats_by_player_key(player_key):
  url = '{r}/{p}/player/{k}'.format(r=STATS_API_URL_ROOT, p=REGULAR_SEASON_API_PATH, k=player_key)
  
  r = requests.get(url)
  return [r.json()]