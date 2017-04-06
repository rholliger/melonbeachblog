var ajaxSettings = {
  url: 'http://localhost:3000/api',
  dataType: 'json',
  contentType: 'application/json'  
}

function request(path, method, data, successCallback, errorCallback) {
  $.ajax({
    url: ajaxSettings.url + path,
    method: method,
    contentType: ajaxSettings.contentType,
    dataType: ajaxSettings.dataType,
    data: JSON.stringify(data),
    success: function(data, status, jqXHR) {
      successCallback(data, status, jqXHR);
    },
    error: function(jqXHR, status, error) {
      errorCallback(jqXHR, status, error);
    }
  }); 
}

$('form').submit(function(e) {
  e.preventDefault();
  console.log('submitted', $(this).attr('name'));
  var type = $(this).attr('name');

  var data = {
    title: $(this).find('input[name="title"]').val(),
    slug: $(this).find('input[name="slug"]').val(),
    category: $(this).find('select').val(),
    content: $(this).find('textarea').val()
  };

  console.log(JSON.stringify(data));

  if (type === 'create') {
    request('/articles', 'POST', data, function(data, status, jqXHR) {
      var location = jqXHR.getResponseHeader('Location');
      // window.location.replace('/admin' + location);
      window.location.replace('/admin/articles');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    });
  } else {
    var articleId = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1);
    request('/articles/'+articleId, 'PUT', data, function(data, status, jqXHR) {
      window.location.replace('/admin/articles');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    })
  }
});

$('.list').find('a.delete').on('click', function(e) {
  e.preventDefault();
  swal({
    title: 'Delete Article',
    text: 'Do you really want to delete this article?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    buttonsStyling: false,
    cancelButtonClass: 'cancel',
    customClass: 'alert'
  }, function() {
    window.location.href = e.currentTarget.href;
  });
});