class OutcomesController < ApplicationController
  before_action :set_outcome, only: [:show]
  layout :set_layout, only:[:show] 

  
  def show
      @preview = params[:preview] ? true : false
      points = ResultEncoder.new(params[:result_code]).decoded
      @quiz =  Quiz.published.find_by(url_name: params[:quiz_url_name])
      @result = @quiz.get_result_by_points(points)
      @outcome = @result[:outcome]
      set_tags(@quiz, @outcome)
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outcome
    
    end

    def set_tags(quiz, outcome)
      return unless quiz && outcome
      set_meta_tags title: quiz.title + " | " + outcome.title, description: quiz.description
      set_meta_tags og:{ type: "article",title: "You scored #{@result[:percentage]}%! " +  outcome.title, url: request.original_url, description: outcome.description, image: outcome.image.image_file.url }
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.fetch(:outcome, {})
    end
    def set_layout
      params['preview'] ? "client/application" : "application"
    end
end
