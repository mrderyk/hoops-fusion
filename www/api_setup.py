from www.features.leaders.resources import LeadersHandler
from www.features.search.resources import SearchHandler
from www.features.personnel.resources import PlayerHandler
from www.features.stats.resources import PlayerStatsHandler
from www.global_dependencies import global_dependencies


api = global_dependencies.api


api.add_resource(LeadersHandler, '/leaders')
api.add_resource(SearchHandler, '/search/<search_string>')
api.add_resource(PlayerHandler, '/personnel/player/<key>')
api.add_resource(PlayerStatsHandler, '/stats/player/<player_key>/<stat_type>')