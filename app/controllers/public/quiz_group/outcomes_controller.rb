module Public
  module QuizGroup

    class OutcomesController < ApplicationController
      layout :set_layout, only:[:preview] 

      
      def show 
        @preview = false
        @quiz = Quiz.published.find_by(url_name: params[:quiz_url_name])
        set_results
      end

      def preview
        @quiz = current_user.quizzes.find_by(url_name: params[:quiz_url_name])
        @preview = true
        set_results
        render :show
      end


      private
        # Use callbacks to share common setup or constraints between actions.

        def set_results
          @result = @quiz.get_result_by_result_code(params[:result_code])
          @outcome = @result[:outcome]
          set_tags(@quiz, @outcome)
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
          "client/application"
        end
    end
  end
end
