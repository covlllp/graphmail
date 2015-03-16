app.factory('typeSearch', function(filterSearch) {
  return function(emails, searchStr) {
    var house = {};
    house['Matching: ' + searchStr] = filterSearch(true)(emails, searchStr);
    house['Not Matching'] = filterSearch(false)(emails, searchStr);
    return house;
  };
});