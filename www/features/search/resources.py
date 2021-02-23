from flask import jsonify, make_response, request
from flask_restful import Resource, Api
from . service import get_player_search_results

class SearchHandler(Resource):
    def get(self, search_string):
        player_search_results = get_player_search_results(search_string)
        response = PlayerSearchResultsResponse(200, player_search_results)

        return response.to_json()


class PlayerSearchResultsResponse():
    def __init__(self, status_code, players):
        self._status_code = status_code
        print(players.serialize())
        self._players = players

    def to_json(self):
        return make_response(
            jsonify(self._players.serialize()),
            self._status_code
        )