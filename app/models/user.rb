class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  PROVIDERS = {
    facebook: 'Facebook'
  }


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,  :confirmable
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :providers, dependent: :destroy
  has_many :quizzes, dependent: :nullify

  def self.from_omniauth(auth)
    provider = Provider.find_by(provider:auth.provider, uid: auth.uid)
    return provider.user if provider
    user = register_oauth_with_matching_email(auth)
    unless user
      user = User.new
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      user.remote_avatar_url = auth.info.image.gsub('http://','https://')
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
