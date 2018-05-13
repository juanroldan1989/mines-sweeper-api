class Game < ActiveRecord::Base
  validates :rows, :columns, :mines, presence: true

  PLAYING = 0
  LOST    = 1
  WON     = 2

  STATUSES = [
    ["Playing", PLAYING],
    ["Lost",    LOST],
    ["Won",     WON]
  ]
end
