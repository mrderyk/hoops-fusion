import requests
from . models import Player


PLAYER_API_URL = 'http://0.0.0.0:9002/player'


def get_player_by_key(key):
  url = '{url}/{key}'.format(
    url=PLAYER_API_URL,
    key=key
  )

  r = requests.get(url)
  return Player(r.json()['player'])