require "reform/form/validation/unique_validator"
class Client::QuestionForm  < Reform::Form
  include Reform::Form::ActiveRecord
  include Reform::Form::ActiveModel::ModelReflections
  include Client::ImageForm

  model :Question
  property :title
  property :description
  property :order_by
  validates :title, :order_by, presence: true
  validates :title, unique: true
  
  
  AnswerPopulator = -> (options) {
    fragment, collection, index = options[:fragment], options[:model], options[:index]

    if fragment[:id].to_s ==  "" 
      item=nil
    else
      item = collection.find { |item| item.id.to_s == fragment[:id].to_s }
    end

    if fragment["_destroy"] == "1"
      collection.delete(item) if item
      return skip!
    else
      item ? item : collection.append(Answer.new)
    end
  }

  collection :answers, prepopulator: ->(*) { self.answers << Answer.new(order_by:1) }, populator: AnswerPopulator do
    include NestedForm
    property :title
    property :points
    validates :title, :points,  presence: true
  end

end
