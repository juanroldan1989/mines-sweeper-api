class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer  :rows
      t.integer  :columns
      t.integer  :mines
      t.text     :mines_positions, array: true, default: []
      t.text     :squares_revealed, array: true, default: []
      t.text     :squares_flagged, array: true, default: []
      t.datetime :stopped_at
      t.integer  :status, default: 0

      t.timestamps null: false
    end
  end
end
