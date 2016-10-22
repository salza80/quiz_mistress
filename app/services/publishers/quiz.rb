module Publishers
  class Quiz
    extend ActiveModel::Naming

    def initialize(quiz)
      @errors = ActiveModel::Errors.new(self)
      @quiz=quiz
    end

    attr_reader :errors 

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

    def validate!
      has_questions
      has_image
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


    def has_questions
      return if @quiz.questions.count > 0
      errors.add(:base, :blank, message: "Must have at least one question")
    end

    def has_image
      return if @quiz.image
      return if @quiz.image.image_file.url >""
      errors.add(:base, :blank, message: "You must upload a main quiz image")
    end

    private

    
  end
end
