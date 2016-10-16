class Client::QuestionForm  < Reform::Form
  include Reform::Form::ActiveRecord
  property :title
  property :description
  property :order_by
  validates :title, :order_by, presence: true
  
  property :image do
    property :image_file
  end

  collection :answers do
    property :title
    property :points
    property :order_by
    validates :title, :points,  presence: true
  end

end
