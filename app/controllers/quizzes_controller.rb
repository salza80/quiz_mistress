class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @quizzes = Quiz.published
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = Quiz.published.find_by(url_name: params[:url_name])
      set_tags(@quiz)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.fetch(:quiz, {})
    end

    def set_tags(quiz)
      set_meta_tags title: quiz.title, description: quiz.description
      set_meta_tags og:{ type: "article", title: quiz.title, url: quiz_url(quiz), description: quiz.description, image: quiz.image.image_file.url }
    end
end
