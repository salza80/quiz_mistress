
# config.fog_credentials = { ... } # Provider specific credentials
CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV['AWS_KEY'],                        # required
    aws_secret_access_key: ENV['AWS_SECRET'],                     # required
    region:                'us-west-1',                  # optional, defaults to 'us-east-1'
    host:                  's3-us-west-1.amazonaws.com',             # optional, defaults to nil
    endpoint:              'https://s3-us-west-1.amazonaws.com' # optional, defaults to nil
  }
  config.fog_directory  = ENV['AWS_DIR']                          # required
  config.fog_public     = false                                        # optional, defaults to true
  config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" } # optional, defaults to {}
end
