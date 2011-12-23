function(e, r) {
  return {
    title: $(this).parent().attr('id'),
    name : r.userCtx.name,
    uri_name : encodeURIComponent(r.userCtx.name),
    auth_db : encodeURIComponent(r.info.authentication_db)
  };
}
