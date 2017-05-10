let toastCounter = 0;

module.exports.setToastMessage = function(req, type, message) {
  const toast = {
    type: type,
    message: message
  };

  req.session.toast = toast;
  toastCounter = 0;
}

module.exports.getToastMessage = function(req) {
  if (toastCounter > 0) {
    delete req.session.toast;
  } else {
    toastCounter++;
    return req.session.toast;
  }
}