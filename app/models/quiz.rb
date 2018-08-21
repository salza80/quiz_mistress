class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :outcomes, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy
  acts_as_taggable_on :category, :topic
  belongs_to :user
  validates :title, :description, :url_name, presence: true
  validates :url_name, format:{ without: /^\d/, multiline: true, message: "can't begin with a number"}
  # validates :url_name, uniqueness:true

  enum status: { draft:0, published:1 }
 
  def to_param
    url_name
  end

  def self.find(input)
    input.to_i == 0 ? where(url_name:input).first : super
  end

  def self.get_result_code(url_name, answers)
    quiz = Quiz.find_by(url_name: url_name)
    result = quiz.get_result_by_answers(answers)
    result_code = ResultEncoder.new(result[:points]).encoded
  end

  def get_result_by_result_code(result_code)
     points = ResultEncoder.new(result_code).decoded
     result = get_result_by_points(points)
  end

  def max_points
    total = 0
    questions.each do |q|
      total += q.max_points
    end
    total
  end

  def calc_points(answers)
    total=0
    r = Array.new()
    answers.each do |answer|
      q = questions.find(answer['question_id'])
      next unless q
      total += q.get_points(answer['answer_id'])
    end
    total
  end

    

  def get_result_by_answers(answers)
    get_result_by_points(calc_points(answers))
  end

  def get_result_by_points(points)
    result = Hash.new
    result[:points] = points
    result[:max_points] = max_points
    result[:percentage] = ((points.to_f / max_points.to_f) * 100).round
    result[:outcome] = get_outcome_by_percentage(result[:percentage])
    result

  end



  def get_outcome_by_percentage(percentage)
    outcomes.find_by_percentage(percentage)
  end


  
end
