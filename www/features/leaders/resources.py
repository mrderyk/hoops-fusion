from flask import jsonify, make_response, request
from flask_restful import Resource, Api
from . service import get_leaders, get_leader_addition

class LeadersHandler(Resource):
  def get(self):
    date = request.args.get('date')
    if date:
      pass
    else:
      leaders = get_leaders()
    response = LeadersResponse(200, leaders)

    return response.to_json()


class LeadersResponse():
  def __init__(self, status_code, leaders):
    self._status_code = status_code
    self._leaders = leaders

  def to_json(self):
    return make_response(
      jsonify(self._leaders.serialize()),
      self._status_code
    )


class LeadersAdditionHandler(Resource):
  def get(self, player_key):
    category = request.args.get('category')
    season = request.args.get('season')
    type = request.args.get('type')
    additional_player = get_leader_addition(player_key, season, category, type)
    response = LeadersAdditionResponse(200, additional_player)
    
    return response.to_json()


class LeadersAdditionResponse():
  def __init__(self, status_code, additional_player):
    self._status_code = status_code
    self._additional_player = additional_player

  def to_json(self):
    return make_response(
      jsonify(self._additional_player),
      self._status_code
    )