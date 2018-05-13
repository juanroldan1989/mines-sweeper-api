class Game < ActiveRecord::Base
  validates :rows, :columns, :mines, presence: true

  before_create :generate_mines_positions

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

  private

  def generate_mines_positions
    self.mines.times do
      mine_position = [rand(rows), rand(columns)]

      # making sure mines are not overlapping within each other
      unless self.mines_positions.include?(mine_position)
        mine_position = [rand(rows), rand(columns)]
      end

      self.mines_positions += [mine_position]
    end
  end
end
