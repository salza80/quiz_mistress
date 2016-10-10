
(function() {
  this.Social || (this.Social = {});

  Social.share = function(btn){
    FB.ui({
    method: 'share',
    href: $(btn).data('s-href'),
    redirect_url: $(btn).data('s-redirect-url'),
  }, function(response){
    console.log(response)
  });
  }

}).call(this);
