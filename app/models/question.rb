class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy
  validates :order_by, :title, presence: true
  default_scope {order('order_by ASC')}

  def max_points
    answers.ordered_by_points.limit(1).pluck(:points).first || 0
  end

  def get_points(answer_id)
    a = answers.find(answer_id)
    return 0 unless a
    return a.points
  end

end
