class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :outcomes, dependent: :destroy
  has_many :images, as: :imageable
  validates :title, :description, :url_name, presence: true
  validates_format_of :url_name, :without => /^\d/, :multiline => true, uniqueness:true

  def to_param
    url_name
  end


  def self.find(input)
    input.to_i == 0 ? where(url_name:input) : super
  end


  def max_points
    total = 0
    questions.each do |q|
      total += q.max_points
    end
    total
  end

  def main_image
    images.by_role('main').first
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

    result
  end

  
end
