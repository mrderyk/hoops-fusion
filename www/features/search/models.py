from enum import Enum

class PlayerSearchResults():
  def __init__(self, players_data):
    self._player_search_results = [PlayerSearchResult(p) for p in players_data[0]['results']]

  def serialize(self):
    return {
      'type': SearchResultType.PLAYER.value,
      'results': [p.serialize() for p in self._player_search_results]
    }


class SearchResult():
  def __init__(self, type):
    self._type = type if SearchResultType.has_value(type) else SearchResultType.ETC


class PlayerSearchResult(SearchResult):
  def __init__(self, result_data):
    super().__init__(SearchResultType.PLAYER)
    self._first_name = result_data['first_name']
    self._last_name = result_data['last_name']
    self._team_code = result_data['team_code']
    self._key = result_data['key']
    self._img_url = result_data['img_url']

  def serialize(self):
    return {
      'first_name': self._first_name,
      'last_name': self._last_name,
      'team_code': self._team_code,
      'key': self._key,
      'img_url': self._img_url
    }
  
  
class SearchResultType(Enum):
    PLAYER = 'player'
    TEAM = 'team'
    ETC = 'etc'

    @classmethod
    def has_value(cls, value):
        return value in cls._value2member_map_ 