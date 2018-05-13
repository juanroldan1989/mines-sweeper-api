Rails.application.routes.draw do
  namespace :v1 do
    resources :games, only: [:create, :show, :update]
    root "welcome#index"
  end

  get "/testing" => "testing#index"

  root "welcome#index"
end
