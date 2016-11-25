class AddUniqueIndexUrlName < ActiveRecord::Migration[5.0]
  def change
    add_index :quizzes, :url_name, :unique => true
  end
end
  
