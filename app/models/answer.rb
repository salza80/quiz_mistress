class Answer < ApplicationRecord
  belongs_to :question
  validates :order_by, :title, :points, presence: true
  default_scope {order('order_by ASC')}
  scope :ordered_by_points, -> { reorder(points: :desc) }

  after_initialize :set_default_values
  
  def set_default_values
    # Only set if time_zone IS NOT set
    self.order_by ||= 1
  end
end
