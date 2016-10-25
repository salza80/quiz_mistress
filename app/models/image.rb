class Image < ApplicationRecord
  belongs_to :imageable, :polymorphic => true
  mount_uploader :image_file, QuizImageUploader
  scope :by_role, -> (image_role) {where(:image_role => image_role) }
end
