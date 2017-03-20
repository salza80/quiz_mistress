// page events executed with one turbolinks trigger
(function() {
	this.PageEvents || (this.PageEvents = {});
	PageEvents.onLoad = {};

	PageEvents.load = function(){
		var body = $("body")
	  if (body.length == 0){return false}
		var fnName = Util.replaceAll(body.data("controller"), '/', '_')
		var fn1 = PageEvents.onLoad[fnName]
    var fn2 
		if(typeof fn1 === 'function') {
		  fn1()
      fn2 =fn1[body.data("action")];
		}
		if(typeof fn2 === 'function') {
		  fn2()
		}
	}

  this.Util || (this.Util = {});

  Util.escapeRegExp = function(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  Util.replaceAll = function(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
}).call(this);
$(document).on('turbolinks:load', PageEvents.load);



//touch devices to manage stick hover issue
(function(){
    var isTouch = false //var to indicate current input type (is touch versus no touch) 
    
    $("html").addClass('no-touch')
    var isTouchTimer 

    function addtouchclass(e){
        clearTimeout(isTouchTimer)
        isTouch = true
          if($("html").hasClass('no-touch')){
            $("html").addClass('can-touch')
            $("html").removeClass('no-touch')
            console.log('can-touch')
          }
        isTouchTimer = setTimeout(function(){isTouch = false}, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event   
    }

    function removetouchclass(e){
        if (!isTouch && $("html").hasClass('can-touch')){ //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false
             $("html").removeClass('can-touch')
             $("html").addClass('no-touch')
            console.log('no-touch')
        }
    }

    $(document).on('touchstart', addtouchclass) //this event only gets called when input type is touch
    $(document).on('mouseover', removetouchclass) //this event gets called when input type is everything from touch to mouse/ trackpad
}).call(this);

