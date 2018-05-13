class WelcomeController < ApplicationController

  def index
    render json: { message: "Welcome to MineSweeperAPI !"}
  end
end
