(function() {
  this.Quiz || (this.Quiz = {});

  Quiz.start = function(){
    $(".quiz-start").hide();
    $("#renderer").removeClass('hidden');
  }

  this.General || (this.General = {});

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

  General.doFormErrors = function(){
    var e = $("#errors")
    jQuery.each(e.data("errors"), function(index){
     General.showFormErrors(this.model,e.data("form-selector"),jQuery.parseJSON(this.errors))
    });
  }

    
  General.showFormErrors=function(modelName, formSelector, errors){
    var form = $(formSelector)
    $.each(errors, function(field, messages){   
      if(messages.length == 0){return true;}
      var input = form.find('input, select, textarea').filter(function(){
        var name = $(this).attr('name')
        if(name !==undefined){
          return name.match(new RegExp(modelName + '\\[' + field + '\\(?'))
        }
      })
      if(input.length ==0){return form;}
      input.closest('.form-group').addClass('has-warning')
      input.addClass('form-control-warning')
      $.each(messages, function(index,message){
        input.parent().append($("<div class='form-control-feedback'></div>").html(message))
      })
    })
    return form
  }
}).call(this);




  
