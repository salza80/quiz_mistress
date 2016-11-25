(function() {
  
  this.Util || (this.Util = {});

  Util.escapeRegExp = function(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  Util.replaceAll = function(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
}).call(this);
