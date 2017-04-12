module Public
  module GameGroup
    class OutcomesController < ApplicationController




      def show
        template = "public/game_group/#{params[:game_url_name]}/outcome"
        @result = HashEncoder.new(params[:result_code]).decoded
        puts @result.inspect
         
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
