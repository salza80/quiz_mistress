class Client::QuestionForm  < Reform::Form
  include Reform::Form::ActiveRecord

  model :Question
  property :title
  property :description
  property :order_by
  validates :title, :order_by, presence: true
  
  property :image, populator: :image! do
    property :title
    property :image_file
    property :ref_url
    property :ref_title
  end

  collection :answers do
    property :title
    property :points
    property :order_by
    validates :title, :points,  presence: true
  end


  def image
    super or Image.new()
  end

  def image!(fragment:, **)
    model.image ? model.image : self.image = model.build_image
  end

end
