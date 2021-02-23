from enum import Enum

class Player():
  def __init__(self, player_data):
    self._player_data = player_data
  
  def serialize(self):
    return self._player_data