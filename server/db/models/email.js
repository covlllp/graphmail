'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	email: {type: Object}
});

mongoose.model('Email', schema);