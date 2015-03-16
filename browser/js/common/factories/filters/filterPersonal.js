app.factory('filterPersonal', function() {
  return function(bool) {
    // true if personal (no cc, only one to), false otherwise
    return function(emails) {
      return emails.filter(function(email) {
        var isGroup = email.payload.headers.some(function(header) {
          return header.name === 'Cc';
        });
        return bool ? !isGroup : isGroup;
      });
    };
  };
});