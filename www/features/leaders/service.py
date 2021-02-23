import requests
from concurrent.futures import ThreadPoolExecutor,  as_completed

from . models import AllLeaders


LEADERS_API_URL_ROOT = 'http://0.0.0.0:5000/leaders'
REGULAR_SEASON_API_PATH = 'regular'


def get_leaders():
    # TODO: Add support for specific dates
    urls = [
        '{url_root}/{api_path}'.format(
            url_root=LEADERS_API_URL_ROOT,
            api_path=REGULAR_SEASON_API_PATH
        )
    ]

    pool = ThreadPoolExecutor(len(urls))  # for many urls, this should probably be capped at some value.

    futures = [pool.submit(requests.get, url) for url in urls]
    results = [r.result() for r in as_completed(futures)]
    results_json = [r.json() for r in results]

    return AllLeaders(results_json)

def get_leaders_by_date(date):
    pass