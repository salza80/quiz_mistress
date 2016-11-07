module Validators
  class QuizValidator
    extend ActiveModel::Naming

    attr_reader :questions
    attr_reader :errors
    attr_reader :quiz
    @questions_valid = false


    def initialize(quiz)
      @errors = ActiveModel::Errors.new(self)
      @quiz=quiz
      @questions = quiz.questions.map{|q| Validators::QuestionValidator.new(q)}
    end

    

    def publish
      validate!
      if @errors.empty?
        save
        true
      else
        false
      end
    end

    def save
      @quiz.status = :published
      @quiz.save!
    end

    def valid?
      validate!
      @errors.empty? && @questions_valid
    end

    def validate!
      @questions_valid = true
      @questions.each do |q|
        next if q.valid?
        @questions_valid=false
      end
      has_questions
      has_image
    end

 
    def has_questions
      return if @quiz.questions.count > 0
      errors.add(:questions, :blank, message: "Must have at least one question")
    end

    def has_image
      return if @quiz.image
      return if @quiz.image.image_file.url >""
      errors.add(:base, :blank, message: "You must upload a main quiz image")
    end

    

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
