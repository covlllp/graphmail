app.factory('typeLabel', function(filterLabel) {
  return function(emails, searchStr) {
    var house = {};
    house['Matching: ' + searchStr] = filterLabel(true)(emails, searchStr);
    house['Not Matching'] = filterLabel(false)(emails, searchStr);
    return house;
  };
});