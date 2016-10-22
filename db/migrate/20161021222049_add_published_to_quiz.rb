class AddPublishedToQuiz < ActiveRecord::Migration[5.0]
  def change
    add_column :quizzes, :status, :integer, default: 0
  end
end
