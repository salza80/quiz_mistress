Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'quizzes#index'
  resources :quizzes, only: [:index, :show]
  
  scope '/api', module: 'api', constraints: { format: 'json' } do
    resources :quizzes, only: [:index, :show, :update], param: :url_name

  end

end
