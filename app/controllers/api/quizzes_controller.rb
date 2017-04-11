module Api
  class QuizzesController < ApplicationController

    def show
      @quiz = Quiz.includes(questions: [:answers]).find_by(url_name: params[:url_name])
      render json: {message: 'Resource not found'}, status: :not_found if @quiz.nil?
    end

    def update
      json = JSON.parse(request.body.read)
      answers = json['result']['answers']
      result_code = Quiz.get_result_code(params[:url_name], answers)
      @path = quiz_outcome_path(result_code: result_code, quiz_url_name: params[:url_name])
      if params[:preview]
        @path += "?preview=true"
      end
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
