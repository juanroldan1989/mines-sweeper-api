module V1
  class SquaresController < ApplicationController

    before_filter :set_game

    def update
      square = [resource_params[:row], resource_params[:column]]

      if @game.status == Game::PLAYING
        if @game.mines_positions.include?(square)
          # BOOM !
          @game.squares_revealed += [square]
          @game.status            = Game::LOST
          @game.stopped_at        = Time.now

        else
          # still on the race
          case resource_params[:action]

          when 'reveal'
            @game.squares_revealed += [square]

          when 'question_mark'
            @game.squares_flagged += [square]

          when 'red_flag'
            @game.squares_flagged += [square]
          end
        end
      end

      @game.save

      render json: @game.as_json(only:
        [:id, :rows, :columns, :mines, :mines_positions, :squares_revealed, :squares_flagged]
      ).merge({ started_at: @game.created_at, stopped_at: @game.stopped_at, status: @game.status_name })
    end

    private

    def resource_params
      params.require(:square).permit(:row, :column, :action)
    end

    def set_game
      @game = Game.find_by_id(params[:game_id])

      unless @game.present?
        return render json: { status: 404, message: "Game not found" }
      end
    end
  end
end
