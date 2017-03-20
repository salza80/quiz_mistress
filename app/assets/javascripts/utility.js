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
$(document).on('turbolinks:load', PageEvents.load)



//touch devices to manage stick hover issue
(function(){
    var isTouch = false //var to indicate current input type (is touch versus no touch) 
    var isTouchTimer 
    var curRootClass = '' //var indicating current document root class ("can-touch" or "")

    function addtouchclass(e){
        clearTimeout(isTouchTimer)
        isTouch = true
        if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
            curRootClass = 'can-touch'
            document.documentElement.classList.add(curRootClass)
        }
        isTouchTimer = setTimeout(function(){isTouch = false}, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
    }

    function removetouchclass(e){
        if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false
            curRootClass = ''
            document.documentElement.classList.remove('can-touch')
        }
    }

    document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
    document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
})();

