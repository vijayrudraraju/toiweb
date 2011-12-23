function(e, name, pass) {
  var elem = $(this);
  $.couch.signup({
    name : name
  }, pass, {
    success : function() {
      $('.ui-dialog').dialog('close');
      elem.trigger("doLogin", [name, pass]);
    }
  });
}
