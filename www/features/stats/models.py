class SeasonStats():
  def __init__(self, season):
    self._season = season
    self._stats = {}
  
  def add_stat(self, category, stat_value):
    self._stats[category] = stat_value
  
  def serialize(self):
    return {
      'season': self._season,
      'stats': self._stats
    }