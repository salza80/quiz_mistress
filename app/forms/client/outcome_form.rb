class Client::OutcomeForm  < Reform::Form
  include Reform::Form::ActiveRecord
  include Reform::Form::ActiveModel::ModelReflections
  include Client::ImageForm

  model :outcome
  property :title
  property :description
  property :percentage_to
  validates :title, :percentage_to, presence: true
  
  
end
