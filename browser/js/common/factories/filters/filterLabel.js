app.factory('filterLabel', function(DataFactory) {
  return function(bool) {
    // true if found, false if not found
    return function(emails, searchStr) {
      var regexp = new RegExp(searchStr, 'i');

      return emails.filter(function(email) {
        //var label = DataFactory.hash.label[email.labelId];
        return email.labelIds.some(function(labelId) {
          return regexp.test(labelId);
        });
      });
    };
  };
});