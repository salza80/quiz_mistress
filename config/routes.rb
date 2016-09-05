Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'quizzes#index'
  resources :quizzes, only: [:index, :show]
  
  scope '/api', module: 'api', constraints: { format: 'json' } do
    resources :quizzes, only: [:index]
    get 'quizzes/:url_name', to: 'quizzes#show'
    post 'quizzes/result_code', to: 'quizzes#result_code'
    get 'quizzes/:url_name/outcome/:result_code', to: 'quizzes#outcome'
  end

end
