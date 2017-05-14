const MediaForm = (function() {
  const media = $('#media'),
        mediaForm = media.find('form'),
        dropzone = mediaForm.find('#uploadZone');

  let file = null;

  const init = function() {
    bindActions();
  }

  const bindActions = function() {
    mediaForm.find('#uploadButton').on('change', prepareFileForUpload);
    dropzone.on('dragenter dragover dragleave drop', stopPropagation);
    dropzone.on('dragenter dragleave drop', changeToDragStyles);
    dropzone.on('drop', onDropMediaFiles);
    mediaForm.on('submit', onSubmit);
  }

  const stopPropagation = function(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDropMediaFiles = function(e) {
    file = e.originalEvent.dataTransfer.files;

    // TODO: Can be multiple files
    console.log(file);
    showFileName(file.name);
  }

  const changeToDragStyles = function(e) {
    dropzone.toggleClass('dragOver');
  }

  const showFileName = function(name) {
    mediaForm.find('.info').html(name);
  }

  const prepareFileForUpload = function() {
    file = $(this)[0].files;
    showFileName(file.name);
  }

  const onSubmit = function(e) {
    e.preventDefault();

    MediaUpload.upload(file, function(media) {
      window.location.replace('/admin/media/');
    });
  }

  return {
    init: init
  }
})();

MediaForm.init();