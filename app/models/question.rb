class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers, dependent: :destroy
  has_many :images, as: :imageable
  validates :order_by, :title, presence: true
  default_scope {order('order_by DESC')}


  def main_image
    images.by_role('main').first
  end

  def max_points
    answers.ordered_by_points.limit(1).pluck(:points).first || 0
  end
end
