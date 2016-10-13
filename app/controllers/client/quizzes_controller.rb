class Client::QuizzesController < Client::ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz, only: [:show, :edit, :update]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @quizzes = Quiz.all
  end

  def new
    @quiz = Quiz.new
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
 
  end

  def create
    @quiz = Quiz.create(quiz_params)
    render :edit
  end

  def edit

  end

  def update
    @quiz.update!(quiz_params)
    render :edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      puts params

      @quiz = Quiz.find(params[:id])
      puts @quiz.inspect
      puts @quiz.to_param
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.require(:quiz).permit(:title, :description, :url_name)
    end

    # def set_tags(quiz)
    #   set_meta_tags title: quiz.title, description: quiz.description
    #   set_meta_tags og:{ type: "article", title: quiz.title, url: quiz_url(quiz), description: quiz.description, image: request.base_url + "/assets/images/" + quiz.main_image.path }
    # end
end
