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

$('form[name="login"]').submit(function(e) {
  e.preventDefault();

  var email = $(this).find('input[name="email"]').val();
  var password = $(this).find('input[name="password"]').val();

  var loginData = {
    email: email,
    password: password
  };

  request('/login', 'POST', loginData, function(data, status, jqXHR) {
    var date = new Date();
    date.setTime(date.getTime() + 5000);

    document.cookie = "jwtoken=" + data.token + "; expires=" + date.toUTCString() + "; path=/";

    window.location.replace('/admin/articles/');
  }, function(jqXHR, status, error) {
    console.log('error', error);
  });
});