const media = $('#media');
const mediaForm = media.find('form');

let file = null;

const test = JSON.parse(localStorage.getItem('alert'));

function showFileName(fileName) {
  mediaForm.find('.info').html(fileName); 
}

mediaForm.find('#uploadButton').on('change', function(e) {
  file = $(this)[0].files[0];
  showFileName(file.name);
});

function dragAndDropStyles(e, element) {
  e.stopPropagation();
  e.preventDefault();

  element.toggleClass('dragOver');
}

mediaForm.find('#uploadZone')
  .on('dragenter', function(e) {
    dragAndDropStyles(e, $(this));
  })
  .on('dragover', false)
  .on('dragleave', function(e) {
    dragAndDropStyles(e, $(this));
  })
  .on('drop', function(e) {
    dragAndDropStyles(e, $(this));
    file = e.originalEvent.dataTransfer.files[0];
    showFileName(file.name);
    // showFileName(e.originalEvent.dataTransfer.files[0].name);
});

mediaForm.submit(function(e) {
  e.preventDefault();

  // TODO: Multiupload
  // var fileSelect = $(this).find('#file');
  // var files = fileSelect[0].files;

  // console.log('files', files[0]);

  // var formData = new FormData();

  // for (var i = 0; i < files.length; i++) {
  //   var file = files[i];

  //   formData.append('mediaUpload', file);
  // }

  var formData = new FormData();
  formData.append('mediaUpload', file);

  $.ajax({
    url: ajaxSettings.url + '/media',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data, textStatus, jqXHR) {
      console.log(data, textStatus, jqXHR)
      window.location.replace('/admin/media/');
    }
  });
});