Rails.application.routes.draw do
  devise_for :users, path: 'profile',  controllers: { omniauth_callbacks: "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords', confirmations: 'users/confirmations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope 'profile', module: :users do
    resource :users, only: [:edit, :update]
  end

  root 'quizzes#index'

  resources :quizzes, only: [:index, :show] , param: :url_name do
    resources :outcomes, only: [:show], param: :result_code
  end

  resources :games, only: [:show] , param: :url_name do

  end

  
  scope '/api', module: 'api', constraints: { format: 'json' } do
    resources :quizzes, only: [:index, :show, :update], param: :url_name 
  end

  scope 'manage', module: :client, as: 'client' do
    patch 'quizzes/:id/publish/', to: 'quizzes#publish', as: 'publish_quiz'
    patch 'quizzes/:id/unpublish/', to: 'quizzes#unpublish', as: 'unpublish_quiz'
    resources :quizzes do
      resources :questions
      resources :outcomes
    end
  end

 

end
