module Public
  module GameGroup
    class GamesController < ApplicationController
      # before_action :set_quiz, only: [:show]



      # GET /quizzes
      # GET /quizzes.json
      # def index
      #   @quizzes = Quiz.published
      # end

      # GET /quizzes/1
      # GET /quizzes/1.json
      def show
        template = "public/game_group/#{params[:url_name]}/show"
        if template_exists? template
          render template: template
        else
          render file: "public/404.html", status: :not_found
        end
      end

  


     private
     
     

        def set_tags()
      #     set_meta_tags title: quiz.title, description: quiz.description
      #     set_meta_tags og:{ type: "article", title: quiz.title, url: quiz_url(quiz), description: quiz.description, image: quiz.image.image_file.url }
        end


    end
  end
end
