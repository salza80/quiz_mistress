class OutcomesController < ApplicationController
  before_action :set_outcome, only: [:show]

  
  def show
     puts "sfasdfasdfsdf"

      points = ResultEncoder.new(params[:result_code]).decoded
      puts points

      quiz =  Quiz.find_by(url_name: params[:quiz_url_name])
      puts quiz.inspect
      @outcome = quiz.outcomes.find_by_points(points)
      puts @outcome.inspect
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
