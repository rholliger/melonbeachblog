$('form.createForm').submit(function(e) {
  e.preventDefault();

  var data = {
    title: $(this).find('input[name="title"]').val(),
    slug: $(this).find('input[name="slug"]').val(),
    category: $(this).find('select').val(),
    content: $(this).find('textarea').val()
  };

  console.log(data);

  // $.ajax({
  //   url: 'http://localhost:3000/api/articles',
  //   method: 'POST',
  //   contentType: 'application/x-www-form-urlencoded',
  //   dataType: 'json',
  //   data: data,
  //   success: function(data, status, jqXHR) {
  //     var location = jqXHR.getResponseHeader('Location');
  //     window.location.replace('/admin' + location);
  //   },
  //   error: function(jqXHR, status, error) {
  //     console.log(JSON.parse(jqXHR.responseText));
  //   }
  // });
});