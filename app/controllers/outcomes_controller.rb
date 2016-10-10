class OutcomesController < ApplicationController
  before_action :set_outcome, only: [:show]

  
  def show
      points = ResultEncoder.new(params[:result_code]).decoded
      @quiz =  Quiz.find_by(url_name: params[:quiz_url_name])
      @outcome = @quiz.outcomes.find_by_points(points)
      set_tags(@quiz, @outcome)
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outcome
    
    end

    def set_tags(quiz, outcome)
      set_meta_tags title: quiz.title + " | " + outcome.title, description: quiz.description
      set_meta_tags og:{ type: "article",title: quiz.title, url: request.original_url, description: quiz.description, image: request.base_url + "/assets/images/" + outcome.main_image.path }
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.fetch(:outcome, {})
    end
end
