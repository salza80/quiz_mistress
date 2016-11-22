class Client::OutcomesController < Client::ApplicationController
  before_action :authenticate_user!
  before_action :set_outcome, only: [:show, :edit, :update, :destroy]

  def new
    @quiz = find_quiz
    @outcome_form = Client::OutcomeForm.new(@quiz.outcomes.new)
  end

  def index
    @quiz = find_quiz
  end

  def show
 
  end


  def create
    @quiz = find_quiz
    outcome = @quiz.outcomes.new
    outcome.build_image
    @outcome_form = Client::OutcomeForm.new(outcome)
    if @outcome_form.validate(outcome_params)
      @outcome_form.save 
      @quiz.reload
     else
      render :new
    end
    
  end

  def edit
    @outcome_form = Client::OutcomeForm.new(@outcome)
    @outcome_form.prepopulate!
  end

  def update
    @outcome_form = Client::OutcomeForm.new(@outcome)
    if @outcome_form.validate(outcome_params)
      @outcome_form.save
      @outcome_form.prepopulate!
      @outcome = @outcome_form.model
    else
      render :edit
    end
  end

  def destroy
    @outcome.destroy
    # @quiz.reload

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_quiz
      current_user.quizzes.find_by(url_name:params[:quiz_id])
    end

    def set_outcome
      @quiz = find_quiz
      @outcome = @quiz.outcomes.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def outcome_params
      params.require(:outcome).permit(:id, :title, :description, :percentage_to, image_attributes:[:id, :title,:image_file, :remote_image_file_url,:ref_title, :ref_url])
    end
end
