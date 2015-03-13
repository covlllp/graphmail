'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	label: {type: Object}
});

mongoose.model('Label', schema);