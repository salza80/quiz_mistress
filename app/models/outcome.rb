class Outcome < ApplicationRecord
  belongs_to :quiz
  validates :order_by, :title, :percentage_to, presence: true
  has_one :image, as: :imageable, dependent: :destroy
  # default_scope {order('points_to DESC')}


  def self.find_by_percentage(percentage)
    where(':percentage <= percentage_to', percentage: percentage)
    .order('percentage_to ASC').first
  end

end
