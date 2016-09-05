json.partial! 'api/quizzes/quiz', quiz: @quiz
json.questions do
  json.array! @quiz.questions do |question|
    json.partial! 'api/quizzes/question', question: question
    json.answers do
      json.array! question.answers do |answer|
        json.partial! 'api/quizzes/answer', answer: answer
      end
    end
  end
end

