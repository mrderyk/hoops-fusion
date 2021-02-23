from flask import jsonify, make_response, request
from flask_restful import Resource, Api
from . service import get_regular_season_stats_by_player_key
from . serializers import compile_stats

class PlayerStatsHandler(Resource):
  def get(self, player_key, stat_type):
    if stat_type == 'regular':
      uncompiled_stats = get_regular_season_stats_by_player_key(player_key)
      stats = compile_stats(uncompiled_stats)
    else:
      stats = {}
    
    response = PlayerStatsResponse(200, stats)

    return response.to_json()


class PlayerStatsResponse():
  def __init__(self, status_code, stats):
      self._status_code = status_code
      self._stats = stats

  def to_json(self):
      return make_response(
          jsonify(self._stats),
          self._status_code
      )