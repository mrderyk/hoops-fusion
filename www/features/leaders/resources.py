from flask import jsonify, make_response, request
from flask_restful import Resource, Api
from . service import get_leaders, get_leaders_by_date

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