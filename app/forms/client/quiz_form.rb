class Client::QuizForm  < Reform::Form
  include Reform::Form::ActiveRecord
  include Client::ImageForm

  model :Quiz
  property :title
  property :description
  property :url_name

  def url_name=(value)
    super value.parameterize
  end

  # validates :title, :description, :url_name, presence: true
  # validates_format_of :url_name, :without => /^\d/, :multiline => true
  # validates :url_name, unique: true
  # validates_presence_of :image
end
