json.array! @quizzes do |quiz|
  json.partial! 'api/quizzes/quiz', quiz: quiz
end
