PageEvents.onLoad.client_quizzes = function(){
	console.log("i'm loding for this controller only")
};

PageEvents.onLoad.client_quizzes.edit = function(){
	console.log('this is just for the edit action')


	 $("#quiz_topic_list").select2({
		  tags: true,
		  multiple: true,
		  minimumInputLength: 1
		})

};
