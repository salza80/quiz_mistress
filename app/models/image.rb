class Image < ApplicationRecord
  belongs_to :imageable, :polymorphic => true
  scope :by_role, -> (image_role) {where(:image_role => image_role) }

end
