class Client::OutcomeForm  < Reform::Form
  include Reform::Form::ActiveRecord
  include Reform::Form::ActiveModel::ModelReflections

  model :outcome
  property :title
  property :description
  property :percentage_to
  validates :title, :percentage_to, presence: true
  
  property :image, populator: :image! do
    property :title
    property :image_file
    property :ref_url
    property :ref_title
  end

  def image
    super or Image.new()
  end

  def image!(fragment:, **)
    model.image ? model.image : self.image = model.build_image
  end

end
