Rails.application.routes.draw do
	root 'index#index'

	resources :users, except: [:new, :edit]
end
