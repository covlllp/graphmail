app.factory('typeHangouts', function(filterHangouts) {
	return function(emails) {
		var house = {};
    house.Hangout = filterHangouts(true)(emails);
    house['Not Hangout'] = filterHangouts(false)(emails);
    return house;
	};
});