class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @quizzes = Quiz.all
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
    @urlName = params[:url_name]
  end

  def outcome
    points = ResultEncoder.new(params[:result_code]).decoded
    quiz =  Quiz.find_by(url_name: params[:url_name])
    @outcome = quiz.outcomes.find_by_points(points)
  end
 

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = Quiz.find_by(url_name: params[:url_name])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.fetch(:quiz, {})
    end
end
