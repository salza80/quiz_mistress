class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :outcomes, dependent: :destroy
  has_many :images, as: :imageable
  validates :title, :description, :url_name, presence: true


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
