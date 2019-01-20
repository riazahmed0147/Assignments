// Dependencies
var methods = require('./../app/lib');
var assert = require('assert');

// Holder for test
var unit = {};

// Assert that the stringReverse function should reverse a string
unit['helpers.stringReverse should reverse a string'] = function(done) {
	var val = methods.stringReverse("orange");
	assert.equal(val,'egnaro');
	done();
};

// Assert that the stringReverse function should validate input
unit['helpers.stringReverse should validate input'] = function(done) {
	var val = methods.stringReverse(1234);
	assert.equal(typeof(val),'string');
	done();
};

// Assert that the stringReverse function input length greater than 1
unit['helpers.stringReverse should validate string length greater than 1'] = function(done) {
	var val = methods.stringReverse("o");
	assert.ok(val.length > 1);
	done();
};

// Export the tests to the runner
module.exports = unit;