app.factory('filterSearch', function() {
  return function(bool) {
    // true if found, false if not found
    return function(emails, searchStr) {
      var regexp = new RegExp(searchStr, 'i');

      return emails.filter(function(email) {
        return email.payload.headers.some(function(header) {
          return regexp.test(header.value);
        });
      });
    };
  };
});