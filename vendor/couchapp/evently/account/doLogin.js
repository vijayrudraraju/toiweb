function(e, name, pass) {
  var elem = $(this);
  $.couch.login({
    name : name,
    password : pass,
    success : function(r) {
      $('.ui-dialog').dialog('close');
      elem.trigger("_init")
    }
  });      
}
