class CreateCreateQuizTables < ActiveRecord::Migration[5.0]
  def change
    create_table :quizzes do |t|
      t.string :title
      t.text :description
      t.string :url_name
      t.timestamps null: false
    end

   create_table :questions do |t|
      t.integer :order_by, null:false
      t.string :title, null:false
      t.text :description
      t.references :quiz , index: true
      t.timestamps null: false
    end
    add_foreign_key :questions, :quizzes


    create_table :answers do |t|
      t.integer :order_by, null:false
      t.string :title, null:false
      t.integer :points, null:false
      t.references :question
      t.timestamps null: false
    end
    add_foreign_key :answers, :questions


    create_table :outcomes do |t|
      t.integer :order_by, null:false
      t.string :title, null:false
      t.text :description
      t.integer :points_to, null:false
      t.timestamps null: false
      t.references :quiz
    end
    add_foreign_key :outcomes, :quizzes

    create_table :images do |t|
      t.string :title
      t.string :image_role
      t.string :path
      t.string :ref_title
      t.string :ref_url
      t.references :imageable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end
