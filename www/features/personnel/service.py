import requests
from . models import Player
from www.config import PERSONNEL_SERVICE_URL

PLAYER_API_URL = '{url}/player'.format(url=PERSONNEL_SERVICE_URL)


def get_player_by_key(key):
  url = '{url}/{key}'.format(
    url=PLAYER_API_URL,
    key=key
  )

  r = requests.get(url)
  return Player(r.json()['player'])