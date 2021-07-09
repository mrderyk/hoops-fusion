class Leader():
  def __init__(self, leader_data):
    self._first_name = leader_data['player']['first_name']
    self._last_name = leader_data['player']['last_name']
    self._team_code = leader_data['player']['team_name']
    self._img_url = leader_data['player']['img_url']
    self._key = leader_data['player']['key']
    self._stat = leader_data['stat']
  
  def serialize(self):
    return {
      'player_info': {
        'key': self._key,
        'full_name': '{first_name} {last_name}'.format(first_name=self._first_name, last_name=self._last_name),
        'img_url': self._img_url,
        'team': self._team_code
      },
      'stat': self._stat
    }

class LeadersByCategory():
  def __init__(self, category, leaders_data_for_category):
    self._category = category
    self._leaders = [
      Leader(leader_data_for_category) for leader_data_for_category in leaders_data_for_category
    ]
  
  def serialize(self):
    return {
      'category': self._category,
      'leaders': [leader.serialize() for leader in self._leaders]
    }

class AllLeaders():
  def __init__(self, leaders_data):
    try:
      regular_season_leaders_data = next(
        (l['leaders'] for l in leaders_data if l['leaderboard_type'] == 'regular')
      )
    except StopIteration:
      regular_season_leaders_data = None

    try:
      playoff_leaders_data = next(
        (l['leaders'] for l in leaders_data if l['leaderboard_type'] == 'playoff')
      )
    except StopIteration:
      playoff_leaders_data = None
    
    self._regular_season_leaders_by_category = \
      [LeadersByCategory(r['category'], r['leaders']) for r in regular_season_leaders_data] if regular_season_leaders_data else []

    self._playoff_leaders_by_category = \
      [LeadersByCategory(p['category'], p['leaders']) for p in playoff_leaders_data] if playoff_leaders_data else []

  def serialize(self):
    return {
      'regular': [r.serialize() for r in self._regular_season_leaders_by_category],
      'playoff': [p.serialize() for p in self._playoff_leaders_by_category]
    }