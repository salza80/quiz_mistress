module Public
  module QuizGroup

    class QuizzesController < ApplicationController
      layout :set_layout, only:[:preview]


      # GET /quizzes
      # GET /quizzes.json
      def index
        puts "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
        puts Rails.application.secrets.aws_key
        @quizzes = Quiz.published
      end

      # GET /quizzes/1
      # GET /quizzes/1.json
      def show
        @preview = false
        @quiz = Quiz.published.find_by(url_name: params[:url_name])
        set_tags(@quiz)
      end

      def preview
        @preview =true
        @quiz = current_user.quizzes.find_by(url_name: params[:url_name])
        set_tags(@quiz)
        render :show
      end

      private
       
        # Never trust parameters from the scary internet, only allow the white list through.
        def quiz_params
          params.fetch(:quiz, {})
        end

        def set_tags(quiz)
          set_meta_tags title: quiz.title, description: quiz.description
          set_meta_tags og:{ type: "article", title: quiz.title, url: quiz_url(quiz), description: quiz.description, image: quiz.image.image_file.url }
        end

        def set_layout
          "client/application"
        end
    end
  end
end
