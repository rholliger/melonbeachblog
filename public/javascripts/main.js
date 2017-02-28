$('form.createForm').submit(function(e) {
  e.preventDefault();

  var data = {
    title: $(this).find('input[name="title"]').val(),
    slug: $(this).find('input[name="slug"]').val(),
    category: $(this).find('select').val(),
    content: $(this).find('textarea').val()
  };

  console.log(JSON.stringify(data));

  $.ajax({
    url: 'http://localhost:3000/api/articles',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(data, status, jqXHR) {
      var location = jqXHR.getResponseHeader('Location');
      // window.location.replace('/admin' + location);
      window.location.replace('/admin/articles');
    },
    error: function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    }
  });
});