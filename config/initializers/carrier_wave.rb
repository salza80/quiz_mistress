#old configeration for fog
# CarrierWave.configure do |config|
#   config.fog_provider = 'fog/aws'                        # required
#   config.fog_credentials = {
#     provider:              'AWS',                        # required
#     aws_access_key_id:     ENV['AWS_KEY'],                        # required
#     aws_secret_access_key: ENV['AWS_SECRET'],                     # required
#     region:                'us-west-1',                  # optional, defaults to 'us-east-1'
#     host:                  's3-us-west-1.amazonaws.com',             # optional, defaults to nil
#     endpoint:              'https://s3-us-west-1.amazonaws.com' # optional, defaults to nil
#   }
#   config.fog_directory  = ENV['AWS_DIR']                          # required
#   config.fog_public     = false                                        # optional, defaults to true
#   config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" } # optional, defaults to {}
# end

CarrierWave.configure do |config|
  config.storage    = :aws                        # required
  config.aws_credentials = {
    access_key_id:      Rails.application.secrets.aws_key,                        # required
    secret_access_key:  Rails.application.secrets.aws_secret,                     # required
    region:                'us-west-1',                  # optional, defaults to 'us-east-1'
    # host:                  's3-us-west-1.amazonaws.com',             # optional, defaults to nil
    # endpoint:              'https://s3-us-west-1.amazonaws.com' # optional, defaults to nil
  }
  config.aws_bucket  =  Rails.application.secrets.aws_dir                          # required
  config.aws_acl     = 'public-read'                                        # optional, defaults to true
  config.aws_authenticated_url_expiration = 60 * 60 * 24 * 7
  config.aws_attributes = {
    expires: 1.week.from_now.httpdate,
    cache_control: 'max-age=604800'
  }
end

