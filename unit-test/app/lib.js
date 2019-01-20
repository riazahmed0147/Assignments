/*
 * Basic functions
 *
 */


// Container for all the helpers
const methods = {};

// String reverse
methods.stringReverse = (str) => {
	if(typeof str === 'number') {
		return str;
	}
	return str.split("").reduce((rev, char) => char + rev, '');	
}

// Export the module
module.exports = methods;