class AddPercentageToOutcome < ActiveRecord::Migration[5.0]
  def change
    add_column :outcomes, :percentage_to, :integer
    remove_column :outcomes, :points_to, :integer
  end
end
