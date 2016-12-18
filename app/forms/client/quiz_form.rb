require "reform/form/validation/unique_validator"
class Client::QuizForm  < Reform::Form
  include Client::ImageForm

  model :quiz
  property :title
  property :description
  property :url_name
  property :user_id
  property :topic_list

  def topic_list=(value)
    super value
  end

  def url_name=(value)
    super value.parameterize
  end

  validates :title, :description, :url_name, presence: true
  validates :url_name, format:{ without: /^\d/, multiline: true, message: "can't begin with a number"}
  validates :url_name, unique: true


end
