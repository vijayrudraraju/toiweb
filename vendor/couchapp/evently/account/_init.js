function() {
  var elem = $(this);
  $$(this).userCtx = null;
  $.couch.session({
    success : function(r) {
      var userCtx = r.userCtx;
      if (userCtx.name) {
        console.log('trigger loggedIn');
        elem.trigger("loggedIn", [r]);
      } else if (userCtx.roles.indexOf("_admin") != -1) {
        console.log('trigger adminParty');
        elem.trigger("adminParty");
      } else {
        console.log('trigger loggedOut');
        elem.trigger("loggedOut");
      };
      $('#input').page('destroy').page();
      $('#query').page('destroy').page();
    }
  });
}
