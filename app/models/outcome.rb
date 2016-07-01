class Outcome < ApplicationRecord
  belongs_to :quiz
  validates :order_by, :title, :points_to, presence: true
  has_many :images, as: :imageable
  # default_scope {order('points_to DESC')}

  def self.find_by_points(points)
    where(':points <= points_to', points: points)
    .order('points_to ASC').first
  end

  def main_image
    images.by_role('main').first
  end

end
