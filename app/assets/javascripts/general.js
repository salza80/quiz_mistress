

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

General.showFormErrors=function(modelName, form, errors){
  $.each(errors, function(field, messages){
    var input = $(form).find('input, select, textarea').filter(function(){
      var name = $(this).attr('name')
      if(name !==undefined){
        name.match(new RegExp(model_name + '\\[' + field + '\\(?'))
      }
    })
    input.closest('.form-group').addClass('danger')
  })
}




  
