require 'nokogiri'
namespace :db do
  desc 'Load Quiz Data'
  task load_quizzes: :environment do


    Dir.foreach(Rails.root + 'db/data') do |dir|
      next if dir == '.' or dir == '..'
        f = File.open(File.join(Rails.root, 'db/data', dir, 'quiz.xml'))
        loadquiz = Nokogiri::XML(f).xpath('root')
        puts "loading quiz directory #{dir}"
        quiz = Quiz.find_or_initialize_by( 
          url_name: loadquiz.xpath('url_name').text
        )
        quiz.title = loadquiz.xpath('title').text
        quiz.description = loadquiz.xpath('description').text
        quiz.save!
        quiz.reload
        quiz.images.destroy_all
        quiz.images.build(path: 'quizzes/' + loadquiz.xpath('img_url').text, image_role: 'main' )
       
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
       
          question.images.build(path: 'quizzes/' + q.xpath('img_url').text, image_role: 'main')

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
            points_to: q.xpath('points_to').text.to_i,
            order_by:  q.xpath('order_by').empty? ? loadoutcomes.children.index(q) : q.xpath('order_by').text.to_i 
          )
          new_outcome.save!
          new_outcome.reload
          new_outcome.images.build(path: 'quizzes/' +  q.xpath('img_url').text, image_role: 'main')
          new_outcome.save!
        end
        f.close
        puts "saving quiz #{dir}"
        quiz.save!
     end
  end
end


