module V1
  class GamesController < ApplicationController

    def create
      game = Game.create(resource_params)

      if game.valid?
        render json: game.as_json(only:
                  [:id, :rows, :columns, :mines, :mines_positions, :squares_revealed, :squares_flagged]
                ).merge({ status: 200, started_at: game.created_at, stopped_at: game.stopped_at, status: game.status_name })
      else
        render json: { status: 400, message: "Game can't be created", errors: game.errors.full_messages }
      end
    end

    def show
      game = Game.find_by_id(params[:id])

      if game.present?
        render json: game.as_json(only:
          [:id, :rows, :columns, :mines, :mines_positions, :squares_revealed, :squares_flagged]
        ).merge({ status: 200, started_at: game.created_at, stopped_at: game.stopped_at, status: game.status_name })
      else
        render json: { status: 404, message: "Game not found" }
      end
    end

    private

    def resource_params
      params.require(:game).permit(:rows, :columns, :mines)
    end
  end
end
