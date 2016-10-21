class Client::QuestionsController < Client::ApplicationController
  before_action :authenticate_user!
  before_action :set_question, only: [:show, :edit, :update, :destroy]

  def new
    @quiz = find_quiz
    @question_form = Client::QuestionForm.new(@quiz.questions.new)
    @question_form.prepopulate!
  end

  def index
    @quiz = find_quiz
  end

  def show
 
  end


  def create
    @quiz = find_quiz
    question = @quiz.questions.new
    question.build_image
    @question_form = Client::QuestionForm.new(question)
    if @question_form.validate(question_params)
      @question_form.save  
      
    else
      # handle validation errors.
    end
    question = @question_form.model.reload
    @question_form = Client::QuestionForm.new(question)
    @question_form.prepopulate!
  end

  def edit
    @question_form = Client::QuestionForm.new(@question)
    @question_form.prepopulate!
  end

  def update
    @question_form = Client::QuestionForm.new(@question)
    if @question_form.validate(question_params)
      @question_form.save 
    else
      # handle validation errors.
    end
    @quiz = find_quiz
    @question_form.prepopulate!
  end

  def destroy
    @question.destroy
    # @quiz.reload

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_quiz
      Quiz.find(params[:quiz_id])
    end

    def set_question
      @quiz = find_quiz
      @question = @quiz.questions.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:id, :title, :description, :order_by, image_attributes:[:id, :title,:image_file, :ref_title, :ref_url], answers_attributes:[:id,:title, :points, :order_by, :_destroy])
    end
end
