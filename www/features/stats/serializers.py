from . models import SeasonStats

def sort_cumulative_and_per_game_stats(stats):
  cumulative_season_stats = []
  per_game_season_stats = []

  for s in stats:
    season_stats = s['stats']
    cumulative = SeasonStats(s['season'])
    per_game = SeasonStats(s['season'])

    for k in season_stats.keys():
      if (k.endswith('pg')):
        per_game.add_stat(k, season_stats[k])
      else:
        cumulative.add_stat(k, season_stats[k])
    
    cumulative_season_stats.append(cumulative)
    per_game_season_stats.append(per_game)

  return {
    'cumulative': [c.serialize() for c in cumulative_season_stats],
    'per_game': [p.serialize() for p in per_game_season_stats]
  }

def compile_stats(stats):
  regular_season_stats = next(filter(lambda s: s['stats_type'] == 'regular', stats), None)
  
  return {
    'stats': {
      'regular': sort_cumulative_and_per_game_stats(regular_season_stats['stats']) if regular_season_stats else {},
      'playoff': {}
    }
  }