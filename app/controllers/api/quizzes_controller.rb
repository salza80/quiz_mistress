module Api
  class QuizzesController < ApplicationController
    def index
      @quizzes = Quiz.all
    end

    def show
      @quiz = Quiz.includes(questions: [:answers]).find_by(url_name: params[:url_name])
      render json: {message: 'Resource not found'}, status: :not_found if @quiz.nil?
    end

    def update
      quiz = Quiz.find_by(url_name: params[:url_name])
      json = JSON.parse(request.body.read)
      answers = json['result']['answers']
      result = quiz.get_result_by_answers(answers)
      points=result[:points]
      result_code = ResultEncoder.new(points).encoded
      @path = quiz_outcome_path(result_code: result_code, quiz_url_name: params[:url_name], format: 'html' )
    end

    private

    def quiz_params
      params.require(:result).permit(:points, :url_name)
    end
    def quiz_results
      params.require(:result).permit(answers: [:question_id, :answer_id])
    end
  end
end
