let toastCounter = 0;

// Add a generic function for all toast messages according to the response status code
// If the code is 2xx the success status message should be displayed
// If the code is 4xx the error status message should be displayed
// What should happpen when a 5xx is thrown?
// When should Info's or Warning toast messages happen?

module.exports.setToastMessage = function(req, type, message) {
  const toast = {
    type: type,
    message: message
  };

  req.session.toast = toast;
  console.log('toast', req.session.toast);
  toastCounter = 0;
}

module.exports.getToastMessage = function(req) {
  console.log('toastCoutner --->', toastCounter, req.session.toast);
  if (toastCounter > 0) {
    delete req.session.toast;
  } else {
    toastCounter++;
    return req.session.toast;
  }
}