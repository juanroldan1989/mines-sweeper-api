class Game < ActiveRecord::Base
  validates :rows, :columns, :mines, presence: true

  PLAYING = 0
  PAUSED  = 1
  LOST    = 2
  WON     = 3

  STATUSES = [
    ["Playing", PLAYING],
    ["Paused",  PAUSED],
    ["Lost",    LOST],
    ["Won",     WON]
  ]

  def status_name
    STATUSES.rassoc(self.status).try(:first) || ""
  end
end
