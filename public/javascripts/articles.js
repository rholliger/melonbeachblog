// TODO: How do we do the toast messages? Problems with location change etc..
const ToastMessage = (function() {
  const container = $('.alert');

  const setMessage = function(type) {
    container.addClass('alert-'+type);
    container.html('This is a toast message');
  }

  const displayMessage = function() {
    container.show();
  }

  return {
    set: setMessage,
    display: displayMessage
  };
})();

const ArticleForm = (function() {
  const articles = $('#articles'),
        articleForm = articles.find('form'),
        url = '/articles',
        mediaElement = articleForm.find('.mediaElement'),
        mediaChooser = articleForm.find('.mediaChooser'),
        topElement = articleForm.find('#topelement');

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

  const init = function() {
    bindActions();
    console.log('apiUrl', ajaxSettings.apiUrl);
  }

  const bindActions = function() {
    topElement.on('change', uploadTopElementMedia);
    articleForm.find('.iconContainer a').on('click', removeTopElementMedia);
    articleForm.on('submit', onSubmit);
  }

  const uploadTopElementMedia = function() {
    MediaUpload.upload($(this)[0].files, function(media) {
      mediaElement.find('.imageContainer img').attr('src', '/uploads/'+media.fileName);
      mediaElement.attr('id', media._id);
      mediaElement.show();
      mediaChooser.hide();
    });
  }

  const resetMediaChooser = function() {
    mediaElement.removeAttr('id').hide();
    topElement.val('');
    mediaChooser.show();
  }

  const removeTopElementMedia = function(e) {
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
  }

  const getArticleId = function() {
    var path = window.location.pathname.split('/');
    return path[path.length-2];
  }

  const createNewArticle = function(formData) {
    request(url, 'POST', formData, function(data, status, jqXHR) {
      var location = jqXHR.getResponseHeader('Location');
      // window.location.replace('/admin' + location);
      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log(jqXHR, status, error);
      // console.log(JSON.parse(jqXHR.responseText));
    });
  }

  const updateExistingArticle = function(formData) {
    request(url+'/'+getArticleId(), 'PUT', formData, function(data, status, jqXHR) {
      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log(JSON.parse(jqXHR.responseText));
    });
  }

  const onSubmit = function(e) {
    e.preventDefault();
    
    var formElements = {
      title: articleForm.find('input[name="title"]'),
      slug: articleForm.find('input[name="slug"]'),
      category: articleForm.find('select'),
      content: $(tinymce.activeEditor.editorContainer)
    };

    var mediaElement = null;
    if (articleForm.find('.mediaElement').attr('id') !== undefined) {
      mediaElement = {
        id: articleForm.find('.mediaElement').attr('id'),
        name: articleForm.find('input[name="mediaName"]').val(),
        caption: articleForm.find('input[name="mediaCaption"]').val()
      }
    }

    var data = {
      mediaElement: mediaElement,
      title: formElements.title.val(),
      slug: formElements.slug.val(),
      category: formElements.category.val(),
      content: tinymce.activeEditor.getContent()
    };

    var type = articleForm.attr('name');
    (type === 'create') ? createNewArticle(data) : updateExistingArticle(data)

    // articleFormValidation(data, formElements);
  }

  const validate = function(field, value) {
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

  const articleFormValidation = function(data, elements) {
    // Loop through the contents of the data object
    for (let field in data) {
      for (let rules in validationRules) {
        if (field === rules) {
          validate(field, data[field], elements[field]);
        }
      }
    }
  }

  return {
    init: init
  };
})();

ArticleForm.init();