module Api
  class GamesController < Api::ApplicationController



      def update
        json = JSON.parse(request.body.read)
        result_code = HashEncoder.new(json['result']).encoded
        @path = game_outcome_path(result_code: result_code, game_url_name: params[:url_name])

        template = "api/games/#{params[:url_name]}/update"
        
        if template_exists? template
          render template: template
        else
          render :nothing => true, :status => 404
        end
      end
   
  end
end
