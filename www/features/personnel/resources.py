from flask import jsonify, make_response, request
from flask_restful import Resource, Api
from . service import get_player_by_key

class PlayerHandler(Resource):
  def get(self, key):
    player = get_player_by_key(key)
    response = PlayerResponse(200, player)
    
    return response.to_json()


class PlayerResponse():
    def __init__(self, status_code, player):
        self._status_code = status_code
        self._player = player

    def to_json(self):
        return make_response(
            jsonify(self._player.serialize()),
            self._status_code
        )