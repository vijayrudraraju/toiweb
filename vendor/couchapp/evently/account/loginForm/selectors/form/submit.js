function(e) {
    var name = $('input[name=name]', this).val(),
    var pass = $('input[name=password]', this).val();              
    $(this).trigger('doLogin', [name, pass]);
    return false;
}
