class RemoveOrderByFromOutcomes < ActiveRecord::Migration[5.0]
  def change
    remove_column :outcomes, :order_by, :integer, null:false
  end
end
