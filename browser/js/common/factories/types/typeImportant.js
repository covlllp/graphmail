app.factory('typeImportant', function(filterImportant) {
  return function(emails) {
    var house = {};
    house.Important = filterImportant(true)(emails);
    house.Unimportant = filterImportant(false)(emails);
    return house;
  };
});