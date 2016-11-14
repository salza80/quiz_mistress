

var Quiz = Quiz || {};

Quiz.start = function(){
  $(".quiz-start").hide();
  $("#renderer").removeClass('hidden');
}

var General = General || {};

General.replaceWithFade = function (selector, replace){
  $(selector).fadeOut('slow', function(){
    $(this).replaceWith($(replace))
    $(window).scrollTo($(this));
    $(selector).fadeIn('slow');
  });
}

General.replaceContentWithFade = function(selector, replace){
  $(selector).fadeOut('slow', function(){
    $(this).html($(replace))
    $(window).scrollTo($(this));
    $(selector).fadeIn('slow');
  });
}




  
