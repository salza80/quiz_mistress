module Client::ImageForm
  extend ActiveSupport::Concern


  included do
    property :image, populator: :image! do
      property :title
      property :image_file
      property :ref_url
      property :ref_title
      property :remote_image_file_url

      validates :image_file, file_size: {less_than: 3.megabytes}

    end


    def image
      super or Image.new()
    end

    def image!(fragment:, **)
      fragment[:ref_url] = fragment[:remote_image_file_url] if !fragment[:remote_image_file_url].empty?
      model.image ? model.image : self.image = model.build_image
    end
  end

end
