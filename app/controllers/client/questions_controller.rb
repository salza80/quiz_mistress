class Client::QuestionsController < Client::ApplicationController
  before_action :authenticate_user!
  before_action :set_question, only: [:index, :show, :edit, :update]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @question = @quiz.questions.all
  end

  def new
    @quiz = Quiz.find(params[:quiz_id])
    question = @quiz.questions.new
    @question_form = question
    # @question_form = Client::QuestionForm.new(question)
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
 
  end

  def create
    @quiz = Quiz.find(params[:quiz_id])
    # question = quiz.questions.build!(question_params)
    # @question_form = Client::QuizQuestionForm.new(question)
    @question_form = Client::QuestionForm.new(@quiz.questions.new)
    puts @question_form.validate(question_params)
    puts @question_form.errors
    if @question_form.validate(question_params)
      puts @question_form.inspect
      @question_form.save  
      @question = @question_form.model
    else
      # handle validation errors.
    end
    @question_form = Client::QuestionForm.new(@question)
    puts "herslfjsdlfj"
    puts @question_form.inspect
  end

  def edit
    @question_form = Client::QuestionForm.new(@question)
  end

  def update
    @question_form = Client::QuestionForm.new(@question)
    if @question_form.validate(question_params)
      @question_form.save 
    else
      # handle validation errors.
    end
    @quiz = Quiz.find(params[:quiz_id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @quiz = Quiz.find(params[:quiz_id])
      @question = @quiz.questions.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:title, :description, :order_by, answers:[:title, :points, :order_by])
    end
end
