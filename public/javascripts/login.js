const LoginForm = (function() {
  const login = $('#login'),
        loginForm = login.find('form');

  const init = function() {
    bindActions();
  }

  const bindActions = function() {
    loginForm.on('submit', onSubmit);
  }

  const onSubmit = function(e) {
    e.preventDefault();

    var email = $(this).find('input[name="email"]').val();
    var password = $(this).find('input[name="password"]').val();

    var loginData = {
      email: email,
      password: password
    };

    request('/login', 'POST', loginData, function(data, status, jqXHR) {
      Cookies.set('jwtoken', data.token, { expires: 1 });

      window.location.replace('/admin/articles/');
    }, function(jqXHR, status, error) {
      console.log('error', error);
    });
  }

  return {
    init: init
  };
})();

LoginForm.init();