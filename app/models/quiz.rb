class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :outcomes, dependent: :destroy
  has_many :images, as: :imageable
  validates :title, :description, :url_name, presence: true
  validates_format_of :url_name, :without => /^\d/, :multiline => true

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
end
