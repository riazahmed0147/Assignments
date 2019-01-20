/*
 * CLI-Related Tasks
 *
 */

// Dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var helpers = require('./helpers');

// Instantiate the CLI module object
var cli = {};

// Input handlers
e.on('man', function(str) {
	cli.responders.help();
});

e.on('help', function(str) {
	cli.responders.help();
});

e.on('exit', function(str) {
	cli.responders.exit();
});

e.on('stats', function(str) {
	cli.responders.stats();
});

e.on('list menu', function(str) {
	cli.responders.listMenu();
});

e.on('list orders', function(str) {
	cli.responders.listOrders();
});

e.on('more order info', function(str) {
	cli.responders.moreOrderInfo(str);
});

e.on('list users', function(str) {
	cli.responders.listUsers();
});

e.on('more user info', function(str) {
	cli.responders.moreUserInfo(str);
});



// Responders object
cli.responders = {};

// Help / Man
cli.responders.help = function() {
	var commands = {
		'exit' : 'Kill the CLI (and the rest of the application)',
		'man' : 'Show this help page',
		'help' : 'Alias of the "man command',
		'stats' : 'Get statistics on the underlying operating system and resource utilization',
		'list menu' : 'Show a list of all the menu items in the system',
		'list orders' : 'Show a list of all orders placed in the last 24 hours',
		'more order info --{orderId}' : 'Show details of a specific order',
		'list users' : 'Show a list of all the registered (undeleted) users in the system',
		'more user info --{userId}' : 'Show details of a specific user'
	};

// Show a header for the help page that is as wide as the screen
cli.horizontalLine();
cli.centered("CLI MANUAL");
cli.horizontalLine();
cli.verticalSpace(2);

// Show each command, followed by its explanation in white and yellow respectively
for(var key in commands) {
	if(commands.hasOwnProperty(key)) {
		var value = commands[key];
		var line = '\x1b[33m'+key+'\x1b[0m';
		var padding = 60 - line.length;
		for(i = 0; i < padding; i++) {
			line += ' ';
		}
		line += value;
		console.log(line);
		cli.verticalSpace();
	}
}

cli.verticalSpace();

// End with another horizontalLIne
cli.horizontalLine();

};

// Chreate a vertical space
cli.verticalSpace = function(lines) {
	lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
	for(i=0; i<lines; i++) {
		console.log('')
	}
};


// Create a horizontal line across the screen
cli.horizontalLine = function() {
	// Get the available screen size
	var width = process.stdout.columns;

	var line = '';
	for(i=0; i< width; i++) {
		line+='-';
	}
	console.log(line);
};

// Create centered text on the screen
cli.centered = function(str) {
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

	// Get the available screen size
	var width = process.stdout.columns;

	// Calculate the left padding there should be
	var leftPadding = Math.floor((width - str.length) / 2);

	// Put in left padded spaces before string itself
	var line = '';
	for(i=0; i < leftPadding; i++) {
		line+= ' ';
	}
	line+= str;
	console.log(line);
}


// Exit
cli.responders.exit = function() {
	process.exit(0);
}

// Stats
cli.responders.stats = function() {
	// Compile an object of stats
	var stats = {
		'Load Average' : os.loadavg().join(' '),
		'CPU Count' : os.cpus().length,
		'Free Memory' : os.freemem(),
		'Current Malloced Memory' : v8.getHeapStatistics().malloed_memory,
		'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
		'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
		'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
		'Uptime' : os.uptime()+' Seconds'
	};

	// Create a header for the stats
	cli.horizontalLine();
	cli.centered("SYSTEM STATISTICS");
	cli.horizontalLine();
	cli.verticalSpace(2);

	// Log out each stat
	for(var key in stats) {
		if(stats.hasOwnProperty(key)) {
			var value = stats[key];
			var line = '\x1b[33m'+key+'\x1b[0m';
			var padding = 60 - line.length;
			for(i = 0; i < padding; i++) {
				line += ' ';
			}
			line += value;
			console.log(line);
			cli.verticalSpace();
		}
	}

	cli.verticalSpace();

	// End with another horizontalLIne
	cli.horizontalLine();
}

// List menu
cli.responders.listMenu = function() {
	_data.read('menu', 'items', function(err, menuItems) {
		if(!err && menuItems) {
			var line = '';
			line += 'Item1: '+ menuItems.Item1+'\n';
			line += 'Item2: '+ menuItems.Item2+'\n';
			line += 'Item3: '+ menuItems.Item3+'\n';
			line += 'Item4: '+ menuItems.Item4+'\n';
			line += 'Item5: '+ menuItems.Item5;
			
			console.log(line);
			cli.verticalSpace();
		}
	})
};

// List recent orders
cli.responders.listOrders = function() {
	_data.list('cart', function(err, cartIds) {
		if(!err && cartIds && cartIds.length > 0) {
			cartIds.forEach(function(cart) {
				_data.stat('cart', cart, function(err, fileStats) {
					if(!err && fileStats) {
						// File create time in miliseconds 
						var fileCreateTime = fileStats.birthtimeMs;
						// One day in miliseconds
						var oneday = 60 * 60 * 24 * 1000;

						// check if file creation time is less than one day
						if(Date.now() - fileCreateTime < oneday) {
							console.log(cart);
							cli.verticalSpace();
						}

					} else {
						console.log(err);
					}
				})
			})
		}		
	});
}

// More order info
cli.responders.moreOrderInfo = function(str) {
	// Get the ID from the string 
	var arr = str.split("--");
	var orderId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;

	if(orderId) {
		// Lookup the user
		_data.read('cart', orderId, function(err, cartData) {
			if(!err && cartData) {

				// Print the JSON with text highlighting
				cli.verticalSpace();
				console.dir(cartData, {'colors' : true});
				cli.verticalSpace();
			}
		});
	}
}

// List users
cli.responders.listUsers = function() {	
	_data.list('users', function(err, userEmails) {		
		if(!err && userEmails && userEmails.length > 0) {
			userEmails.forEach(function(userEmail) {
				_data.stat('users', userEmail, function(err, fileStats) {
					if(!err && fileStats) {
						// File create time in miliseconds 
						var fileCreateTime = fileStats.birthtimeMs;
						// One day in miliseconds
						var oneday = 60 * 60 * 24 * 1000;

						// check if file creation time is less than one day
						if(Date.now() - fileCreateTime < oneday) {
							_data.read('users', userEmail, function(err, userData) {
								if(!err && userData) {
									var line = 'Name: '+ userData.firstName+' '+userData.lastName+' Email: '+userData.email;
									
									console.log(line);
									cli.verticalSpace();
								}
							})
						}

					} else {
						console.log(err);
					}
				})
			});			
		}; 
	});
};

// More user info
cli.responders.moreUserInfo = function(str) {
	// Get the ID from the string 
	var arr = str.split("--");
	var userEmail = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;

	if(userEmail) {
		// Lookup the user
		_data.read('users', userEmail, function(err, userData) {
			if(!err && userData) {
				// Remove the hashed password
				delete userData.hashedPassword;

				// Print the JSON with text highlighting
				cli.verticalSpace();
				console.dir(userData, {'colors' : true});
				cli.verticalSpace();
			}
		});
	}
};


// Input processor
cli.processInput = function(str) {
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

	// Only process the input if the user actually wrote something. Otherwise ignore
	if(str) {
		// Codify the unique strings that identify the unique questions allowed to be asked
		var uniqueInputs = [
			'man',
			'help',
			'exit',
			'stats',
			'list menu',
			'list orders',
			'more order info',
			'list users',
			'more user info'
		];

		// Go through the possible inputs, emit an event when a match is found
		var matchFound = false;
		var counter = 0;
		uniqueInputs.some(function(input) {
			if (str.toLowerCase().indexOf(input) > -1) {
				matchFound = true;
				// Emit an event match the unique input, and include the full string given
				e.emit(input,str);
				return true;
			}
		});


		// If no match found, tell the user to try again
		if(!matchFound) {
			console.log('Sorry, try again');
		}
	}
}



// Init script
cli.init = function() {
	// Send the start message to the console, in dark blue
	console.log('\x1b[34m%s\x1b[0m', 'The CLI is runnning');

	// Start the interface
	var _interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: ''
	})

	// Create an initial prompt
	_interface.prompt();

	// Handle each line of input separately
	_interface.on('line', function(str) {
		// Send to the input processor
		cli.processInput(str);

		// Re-initialize the prompt afterwards
		_interface.prompt();
	});

	// If the user stops the CLI, kill the associated process
	_interface.on('close', function() {
		process.exit(0);
	});
};



// Export the module
module.exports = cli;