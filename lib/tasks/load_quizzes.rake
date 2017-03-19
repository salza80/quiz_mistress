require 'nokogiri'
namespace :db do
  desc 'Load Quiz Data'
  

  task load_quizzes: :environment do

    mainUser = User.find_or_initialize_by(email: "smclean17@gmail.com") do |u|
      u.name = "Sally Mclean"
      u.password = 'password'
    end
    mainUser.skip_confirmation!
    mainUser.save!

    Dir.foreach(Rails.root + 'db/data') do |dir|
      next if dir == '.' or dir == '..'
        f = File.open(File.join(Rails.root, 'db/data', dir, 'quiz.xml'))
        loadquiz = Nokogiri::XML(f).xpath('root')
        puts "loading quiz directory #{dir}"
        quiz = Quiz.find_or_initialize_by( 
          url_name: loadquiz.xpath('url_name').text,
          user: mainUser
        )
        quiz.title = loadquiz.xpath('title').text
        quiz.description = loadquiz.xpath('description').text
        quiz.status = :published
        quiz.save!
        quiz.reload
        quiz.build_image(title: loadquiz.xpath('img_title').text, ref_title: loadquiz.xpath('img_ref_title').text, ref_url: loadquiz.xpath('img_ref_url').text )
        File.open('db/data/' + loadquiz.xpath('img_url').text) do |image|
          quiz.image.image_file = image
        end
        quiz.save
        f.close

        quiz.questions.destroy_all

        f = File.open(File.join(Rails.root, 'db/data', dir, 'questions.xml'))
        loadquestions = Nokogiri::XML(f).xpath('root')
        loadquestions.xpath('questions').each do |q, index|
          question = quiz.questions.build(
            title: q.xpath('title').text,
            description: q.xpath('description').text,
            order_by:  q.xpath('order_by').empty? ? loadquestions.children.index(q) : q.xpath('order_by').text.to_i
          )
          question.save!
          question.reload

          question.build_image(title: q.xpath('img_title').text,  ref_title: q.xpath('img_ref_title').text, ref_url: q.xpath('img_ref_url').text)
          File.open('db/data/' + q.xpath('img_url').text) do |image|
            question.image.image_file = image
          end
          question.save

          (1..6).each do |i|
            puts q.xpath("answer_#{i}_title").text
            next if q.xpath("answer_#{i}_title").text.empty?
            question.answers.build(
              title: q.xpath("answer_#{i}_title").text,
              points: q.xpath("answer_#{i}_points").text.to_i,
              order_by:  q.xpath('order_by').empty? ? Random.new().rand(100) : q.xpath('order_by').text.to_i  
            )
          end
          question.save!
        end
        f.close

        quiz.outcomes.destroy_all

        f = File.open(File.join(Rails.root, 'db/data', dir, 'outcomes.xml'))
        loadoutcomes = Nokogiri::XML(f).xpath('root')
        loadoutcomes.xpath('outcomes').each do |q, index|
          new_outcome = quiz.outcomes.build(
            title: q.xpath('title').text,
            description: q.xpath('description').text,
            percentage_to: q.xpath('percentage_to').text.to_i,
          )
          new_outcome.save!
          new_outcome.reload  

          new_outcome.build_image(title: q.xpath('img_title').text,  ref_title: q.xpath('img_ref_title').text, ref_url: q.xpath('img_ref_url').text)
          File.open('db/data/' + q.xpath('img_url').text) do |image|
            new_outcome.image.image_file = image
          end
          new_outcome.save!
        end
        f.close
        puts "saving quiz #{dir}"
        quiz.save!
     end
  end
end


