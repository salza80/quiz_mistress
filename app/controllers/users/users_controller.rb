class Users::UsersController < ApplicationController
  layout 'profile'
  before_action :authenticate_user!



  def edit
    puts current_user.inspect
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
    
    end
    redirect_to edit_users_path
  end

 

  private
    
    def user_params
      params.require(:user).permit(:name, :avatar)
    end


end
