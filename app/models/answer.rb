class Answer < ApplicationRecord
  belongs_to :question
  validates :order_by, :title, :points, presence: true
  default_scope {order('order_by DESC')}
  scope :ordered_by_points, -> { reorder(points: :desc) }
end
