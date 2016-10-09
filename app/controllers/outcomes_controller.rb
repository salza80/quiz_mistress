class OutcomesController < ApplicationController
  before_action :set_outcome, only: [:show]

  
  def show
      points = ResultEncoder.new(params[:result_code]).decoded
      @quiz =  Quiz.find_by(url_name: params[:quiz_url_name])
      @outcome = @quiz.outcomes.find_by_points(points)
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outcome
     
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.fetch(:outcome, {})
    end
end
