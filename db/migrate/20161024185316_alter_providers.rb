class AlterProviders < ActiveRecord::Migration[5.0]
  def change
    rename_column :providers, :providers, :provider
  end
end
