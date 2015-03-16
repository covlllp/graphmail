app.factory('filterLabel', function(DataFactory) {
  return function(bool) {
    // true if found, false if not found
    return function(emails, searchStr) {
      var regexp = new RegExp(searchStr, 'i');

      return emails.filter(function(email) {
        if (!email.labelIds) return bool ? false : true;
        var labels = email.labelIds.map(function(labelId) {
          return DataFactory.hash.labels[labelId].name;
        });

        var match = labels.some(function(label) {
          return regexp.test(label);
        });
        return bool ? match : !match;
      });
    };
  };
});