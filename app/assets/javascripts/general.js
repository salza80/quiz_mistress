

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

General.showFormErrors=function(modelName, formSelector, errors){
  form = $(formSelector)
  $.each(errors, function(field, messages){
    if(messages.length == 0){return true;}
    var input = form.find('input, select, textarea').filter(function(){
      var name = $(this).attr('name')
      if(name !==undefined){
        return name.match(new RegExp(modelName + '\\[' + field + '\\(?'))
      }
    })
    if(input.length ==0){return true;}
    input.closest('.form-group').addClass('has-warning')
    input.addClass('form-control-warning')
    $.each(messages, function(index,message){
       input.parent().append($("<div style='margin-bottom:10px' class='form-control-feedback'></div>").html(message))
    })
  })
}




  
