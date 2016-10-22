Rails.application.routes.draw do
   devise_for :users, path: 'profile',  controllers: { sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords', confirmations: 'users/confirmations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'quizzes#index'
  resources :quizzes, only: [:index, :show] , param: :url_name do
    resources :outcomes, only: [:show], param: :result_code
  end

  
  scope '/api', module: 'api', constraints: { format: 'json' } do
    resources :quizzes, only: [:index, :show, :update], param: :url_name 
  end

  scope 'manage', module: :client, as: 'client' do
    patch 'quizzes/publish/:id', to: 'quizzes#publish', as: 'publish_quiz'
    get '/patients/:id', to: 'patients#show', as: 'patient'
    resources :quizzes do
      resources :questions
    end
  end

 

end
