class Client::QuizForm  < Reform::Form
  include Reform::Form::ActiveRecord

  model :Quiz
  property :title
  property :description
  property :url_name
  
  property :image, populator: :image! do
    property :title
    property :image_file
    property :ref_url
    property :ref_title
  end

  # validates :title, :description, :url_name, presence: true
  # validates_format_of :url_name, :without => /^\d/, :multiline => true
  # validates :url_name, unique: true
  # validates_presence_of :image

  def image
    super or Image.new()
  end

  def image!(fragment:, **)
    model.image ? model.image : self.image = model.build_image
  end

end
