const validationRules = {
  title: {
    required: true
  },
  category: {
    required: true
  },
  content: {
    required: true
  }
};

const articles = $('#articles');
const articleForm = articles.find('form');

function validate(field, value, el) {
  var result = approve.value(value, validationRules[field]);

  if(!result.approved) {
    el.addClass('errorInput');
    articles.find('.alert').show()

    el.prev().show();
    el.prev().empty();
    result.each(function(error) {
      el.prev().append('<p>'+error+'</p>');
    });
  } else {
    el.removeClass('errorInput');
    el.prev().hide();
    articles.find('.alert').hide();
  }
}

function articleFormValidation(data, elements) {
  // Loop through the contents of the data object
  for (let field in data) {
    for (let rules in validationRules) {
      if (field === rules) {
        validate(field, data[field], elements[field]);
      }
    }
  }
}

articleForm.submit(function(e) {
  e.preventDefault();

  console.log('submitted', $(this).attr('name'));
  var type = $(this).attr('name');
  
  var formElements = {
    title: $(this).find('input[name="title"]'),
    slug: $(this).find('input[name="slug"]'),
    category: $(this).find('select'),
    content: $(tinymce.activeEditor.editorContainer)
  };

  var mediaElement = null;
  if ($(this).find('.mediaElement').attr('id') !== undefined) {
    mediaElement = {
      id: $(this).find('.mediaElement').attr('id'),
      name: $(this).find('input[name="mediaName"]').val(),
      caption: $(this).find('input[name="mediaCaption"]').val()
    }
  }

  // var data = {
  //   mediaElement: mediaElement,
  //   title: $(this).find('input[name="title"]').val(),
  //   slug: $(this).find('input[name="slug"]').val(),
  //   category: $(this).find('select').val(),
  //   content: tinymce.activeEditor.getContent()
  // };

  var data = {
    mediaElement: mediaElement,
    title: formElements.title.val(),
    slug: formElements.slug.val(),
    category: formElements.category.val(),
    content: tinymce.activeEditor.getContent()
  };

  articleFormValidation(data, formElements);

  if (type === 'create') {
    request('/articles', 'POST', data, function(data, status, jqXHR) {
      var location = jqXHR.getResponseHeader('Location');
      // window.location.replace('/admin' + location);
      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log(jqXHR, status, error);
      // console.log(JSON.parse(jqXHR.responseText));
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

articleForm.find('#topelement').on('change', function(e) {
  console.log('changed');
  var fileSelect = $(this);
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
    success: function(media) {
      var mediaElement = articleForm.find('.mediaElement');
      mediaElement.find('.imageContainer img').attr('src', '/uploads/'+media.fileName);
      mediaElement.attr('id', media._id);
      mediaElement.show();
      articleForm.find('.mediaChooser').hide();
    }
  });
});

function resetMediaChooser() {
  articleForm.find('.mediaElement').removeAttr('id').hide();
  articleForm.find('#topelement').val('');
  articleForm.find('.mediaChooser').show();
}

articleForm.find('.iconContainer a').on('click', function(e) {
  e.preventDefault();

  swal({
    title: 'Delete Media',
    text: 'Do you want to remove this media element also from the media browser?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonClass: 'button confirm',
    cancelButtonText: 'No, just from the article',
    cancelButtonClass: 'button cancel',
    buttonsStyling: false,
    customClass: 'alert'
  }).then(function() {
    var mediaId = articleForm.find('.mediaElement').attr('id');
    request('/media/'+mediaId, 'DELETE', {}, function(data, status, jqXHR) {
      resetMediaChooser();
    }, function(jqXHR, status, error) {
      // TODO: Error handling
    });
  }, function(dismiss) {
    if (dismiss === 'cancel') {
      resetMediaChooser();
    }
  });
});



