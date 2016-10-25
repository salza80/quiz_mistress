class User < ApplicationRecord
  PROVIDERS = {
    facebook: 'Facebook'
  }


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,  :confirmable
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :providers, dependent: :destroy

  def self.from_omniauth(auth)
    puts auth
    provider = Provider.find_by(provider:auth.provider, uid: auth.uid)
    return provider.user if provider
    user = register_oauth_with_matching_email(auth)
    unless user
      user = User.new
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      #user.name = auth.info.name
      #user.image = auth.info.image # assuming the user model has an image
      user.skip_confirmation!
      user.save!
      user = register_oauth_with_matching_email(auth)
    end
    user
  end

  def self.register_oauth_with_matching_email(auth)
    user = find_by(email: auth.info.email)
    return nil unless user
    provider = user.providers.find_by(provider:auth.provider, uid: auth.uid)
    unless provider
      user.providers.create(uid: auth.uid, provider: auth.provider)
    end
    user
  end
end
