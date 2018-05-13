module V1
  class WelcomeController < ApplicationController

    def index
      render json: { message: "Welcome to MineSweeperAPI V1 !"}
    end
  end
end
