Rails.application.routes.draw do
  devise_for :users, path: 'profile',  controllers: { omniauth_callbacks: "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords', confirmations: 'users/confirmations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope 'profile', module: :users do
    resource :users, only: [:edit, :update]
  end

  root 'public/quiz_group/quizzes#index'

  scope module: 'public' do
    scope module: 'quiz_group' do
      resources :quizzes, only: [:index, :show] , param: :url_name do
        resources :outcomes, only: [:show], param: :result_code
      end
    end
    scope module: 'game_group' do
      resources :games, only: [:show] , param: :url_name do
        resources :outcomes, only: [:show], param: :result_code
      end
    end
  end

  

  
  scope '/api', module: 'api', constraints: { format: 'json' } do
    resources :quizzes, only: [:index, :show, :update], param: :url_name 
  end

  scope 'manage', module: :client, as: 'client' do
    scope module: 'quiz_group' do
      patch 'quizzes/:id/publish/', to: 'quizzes#publish', as: 'publish_quiz'
      patch 'quizzes/:id/unpublish/', to: 'quizzes#unpublish', as: 'unpublish_quiz'
      resources :quizzes do
        resources :questions
        resources :outcomes
      end
    end
  end

 

end
