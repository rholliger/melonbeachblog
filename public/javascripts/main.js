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

tinymce.init({
  selector: 'textarea',
  height: 400,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste code'
  ],
  toolbar: 'undo redo | insert | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
});


$('#articles form').submit(function(e) {
  e.preventDefault();

  console.log('submitted', $(this).attr('name'));
  var type = $(this).attr('name');

  var data = {
    title: $(this).find('input[name="title"]').val(),
    slug: $(this).find('input[name="slug"]').val(),
    category: $(this).find('select').val(),
    content: tinymce.activeEditor.getContent()
  };

  console.log(JSON.stringify(data));

  if (type === 'create') {
    request('/articles', 'POST', data, function(data, status, jqXHR) {
      var location = jqXHR.getResponseHeader('Location');
      // window.location.replace('/admin' + location);
      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    });
  } else {
    var path = window.location.pathname.split('/');
    var articleId = path[path.length-2];
    request('/articles/'+articleId, 'PUT', data, function(data, status, jqXHR) {
      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    });
  }
});

$('#media form').submit(function(e) {
  e.preventDefault();

  var type = $(this).attr('name');

  if (type === 'upload') {
    var fileSelect = $(this).find('#file');
    var files = fileSelect[0].files;

    console.log('files', files[0]);

    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      formData.append('mediaUpload', file);
    }

    $.ajax({
      url: ajaxSettings.url + '/media',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data) {
        window.location.replace('/admin/media/edit/'+data._id+'/');
      }
    });
  } else {
    var path = window.location.pathname.split('/');
    var mediaId = path[path.length-2];

    var data = {
      name: $(this).find('input[name="name"]').val(),
      description: $(this).find('input[name="description"]').val()
    };

    request('/media/'+mediaId, 'PUT', data, function(data, status, jqXHR) {
      window.location.replace('/admin/media/');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    });
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
  }).then(function() {
    window.location.href = e.currentTarget.href;
  });
});

$('.list').find('.toggle').on('change', function(e) {
  var checkbox = $(e.target);
  articleId = checkbox.attr('data-id');

  data = {
    active: checkbox.is(':checked')
  };

  console.log('data', data);

  request('/articles/'+articleId+'/active', 'PUT', data, function(data, status, jqXHR) {

  }, function(jqXHR, status, error) {
    console.log(JSON.parse(jqXHR.responseText));
  })
});