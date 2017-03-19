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

