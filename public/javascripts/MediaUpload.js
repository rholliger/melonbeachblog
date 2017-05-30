const MediaUpload = (function() {
  const url = '/media',
        uploadName = 'mediaUpload';

  const uploadMediaFile = function(files, callback) {
    console.log("woop", files);
    // TODO: Multiple file uploads
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      formData.append(uploadName, file);
    }

    $.ajax({
      url: ajaxSettings.url + url,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('jwtoken')
      },
      success: callback
      // error: error callback?
    });
  };

  return {
    upload: uploadMediaFile
  };
})();