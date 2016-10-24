class User < ApplicationRecord
  PROVIDERS = {
    facebook: 'Facebook'
  }


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,  :confirmable
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :providers

  def self.from_omniauth(auth)
    puts auth
    register_oauth_with_matching_email(auth)
    user = find_user_by_provider(auth.provider, auth.uid)
    if user

    else
      user = User.new
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      # user.first_name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
      user.save!
      user.reload
      register_oauth_with_matching_email(auth)
    end
    user
  end

  def self.register_oauth_with_matching_email(auth)
    user = where("email = :email",email: auth.info.email).first
    return unless user
    provider = user.providers.where("provider=:provider and uid=:uid", provider:auth.provider, uid: auth.uid).first
    unless provider
      p = user.providers.create(uid: auth.uid, provider: auth.provider)
      # user.uid = auth.uid
      # user.provider = auth.provider
      # user.save
    end
  end

  def self.find_user_by_provider(provider, uid)
    provider = Provider.where("provider=:provider and uid=:uid", provider:provider, uid: uid).first
    return nil unless provider
    provider.user
  end

end
