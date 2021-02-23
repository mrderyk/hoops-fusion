import requests
from concurrent.futures import ThreadPoolExecutor,  as_completed

from . models import PlayerSearchResults


PLAYER_SEARCH_API_URL = 'http://0.0.0.0:9001/search/player'


def get_player_search_results(search_term=''):
  # TODO: Add support for specific dates
  urls = [
    '{url}/{search_term}'.format(
      url=PLAYER_SEARCH_API_URL,
      search_term=search_term
    )
  ]

  pool = ThreadPoolExecutor(len(urls))

  if search_term:
    futures = [pool.submit(requests.get, url) for url in urls]
    results = [r.result() for r in as_completed(futures)]
    results_json = [r.json() for r in results]
  else:
    results_json = []

  return PlayerSearchResults(results_json)
