class RemovePathFromImage < ActiveRecord::Migration[5.0]
  def change
    remove_column :images, :path, :string
    remove_column :images, :image_role, :string
  end
end
