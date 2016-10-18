class Client::QuizzesController < Client::ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz, only: [:show, :edit, :update, :destroy]


  def index
    @quizzes = Quiz.all
  end

  def new
    # @quiz = Quiz.new
    # @quiz.build_image
    @quiz_form = Client::QuizForm.new(Quiz.new)
  end

  def show
 
  end

  def create

    @quiz_form = Client::QuizForm.new(Quiz.new)
    if @quiz_form.validate(quiz_params)
      @quiz_form.save  
      redirect_to client_quizzes_url 
    else
      render :new
    end
    
  end

  def edit
    @quiz_form = Client::QuizForm.new(@quiz)
  end

  def update
    @quiz_form = Client::QuizForm.new(@quiz)
    if @quiz_form.validate(quiz_params)
      @quiz_form.save
       redirect_to edit_client_quiz_url(@quiz)
    else
      render :edit
    end

    
  end

  def destroy
    @quiz.destroy!
    redirect_to client_quizzes_url
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:title, :description, :url_name, image_attributes:[:image_file])
    end


end
