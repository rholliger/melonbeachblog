$('.list').find('a.delete').on('click', function(e) {
  e.preventDefault();
  swal({
    title: 'Delete Article',
    text: 'Do you really want to delete this article?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonClass: 'button confirm',
    cancelButtonClass: 'button cancel',
    buttonsStyling: false,
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