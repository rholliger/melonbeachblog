function request(path, method, data, successCallback, errorCallback) {
  $.ajax({
    url: ajaxSettings.apiUrl + path,
    method: method,
    contentType: ajaxSettings.contentType,
    dataType: ajaxSettings.dataType,
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('jwtoken')
    },
    data: JSON.stringify(data),
    success: function(data, status, jqXHR) {
      successCallback(data, status, jqXHR);
    },
    error: function(jqXHR, status, error) {
      errorCallback(jqXHR, status, error);
    }
  }); 
}