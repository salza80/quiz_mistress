namespace :images do
  desc 'recreate images from uploader'
  task recreate_all: :environment do

    User.find_each do |user|
      user.avatar.recreate_versions! if user.avatar?
    end

    Image.find_each do |i|
      i.image_file.recreate_versions! if i.image_file?
    end
  end
end
