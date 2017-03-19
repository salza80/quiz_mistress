module Validators
  class QuestionValidator
    extend ActiveModel::Naming

    attr_reader :answers
    attr_reader :errors
    attr_reader :question 

    def initialize(question)
      @errors = ActiveModel::Errors.new(self)
      @question=question
    end



    def save
      
    end

    def valid?
      validate!
      @errors.empty?
    end

    def validate!
      @errors.clear
      has_answers
      # has_image
      
    end

    def has_answers
      return if @question.answers.count >= 2
      errors.add(:answers, :blank, message: "Must have at least two answer options")
    end

    # def has_image
    #   return if @question.image
    #   return if @question.image.image_file.url >""
    #   errors.add(:base, :blank, message: "You must upload an image for this question")
    # end

    
    def read_attribute_for_validation(attr)
      send(attr)
    end

    def self.human_attribute_name(attr, options = {})
      attr
    end

    def self.lookup_ancestors
      [self]
    end
    
  end
end
