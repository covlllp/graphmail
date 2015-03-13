'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: {type: String},
	messages: {type: Array}
});

mongoose.model('Thread', schema);