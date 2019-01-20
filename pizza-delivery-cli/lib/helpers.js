/*
 * Helpers for various tasks
 *
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');

// Container for all the helpers
var helpers = {};

// Create a SHA256 hash
helpers.hash = function(str) {
	if(typeof(str) == 'string' && str.length > 0) {
		var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
		return hash;
	} else {
		return false;
	}
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str) {
	try {
		var obj = JSON.parse(str);
		return obj;
	} catch(err) {
		return {};
	}
};

// Container for stripe helpers
helpers.stripe = {};

// Payment using stripe
helpers.stripe.payment = function(cardNumber, expirationMonth, expirationYear, securityCode, zipCode, amount, callback) {
	// Validate parameters
	var cardNumber = typeof(cardNumber) == 'string' && cardNumber.trim().length === 16  &&  helpers.stripe.cards.hasOwnProperty(cardNumber) ? cardNumber.trim() : false;
	var expirationMonth = typeof(expirationMonth) == 'string' && expirationMonth.trim().length === 2 ? expirationMonth.trim() : false;
    var expirationYear = typeof(expirationYear) == 'string' && expirationYear.trim().length === 4 ? expirationYear.trim() : false;
    var securityCode = typeof(securityCode) == 'string' && securityCode.trim().length === 3 ? securityCode.trim() : false;
 	var amount = typeof(amount) == 'number' && amount > 0 ? amount : false;
	var zipCode = typeof(zipCode) == 'string' && zipCode.trim().length === 6 ? zipCode.trim() : false;

	if(cardNumber && expirationMonth && expirationYear && securityCode && amount && zipCode) {
		// Configure the request payload
		var payload = {
			'amount' : amount,
			'currency' : 'usd',
			'description' : 'Payment for purchasing pizza',
			'source' : helpers.stripe.cards[cardNumber]
		};

		// Stringify the payload
		var stringPayload = querystring.stringify(payload);

		// Configure the request details
		var requestDetails = {
			'protocol' : 'https:',
			'hostname' : 'api.stripe.com',
			'method' : 'POST',
			'path' : '/v1/charges',
			'auth' : config.stripe.secretkey,
			'data' : stringPayload,
			'headers' : {
				'Content-type' : 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(stringPayload)
			}
		};
		
		// Instantiate the request object
		var req = https.request(requestDetails, function(res) {
			// Grab the status of the sent request
			var status = res.statusCode;

			// Callback Successfully if the request went through
			if(status == 200 || status == 201) {

				// Get data from stripe api
				res.on('data', function(d) {
					// Parse data into readable format
					var data = d.toString();
					// Parse data string into JSON object
					var dataObject = JSON.parse(data);

					callback(status, data)
				});
			} else {
				res.on('data', function(d) {
					// Parse data into readable format
					var data = d.toString();
					// Parse data string into JSON object
					var dataObject = JSON.parse(data);

					callback(status, {'message: ' : dataObject.error.message});
				});
			}
			
		});

		// Bind to the error event so it doesn't get thrown
		req.on('error', function(e) {
			callback(e);
		});

		// Add the payload
		req.write(stringPayload);

		// End the request
		req.end();

	} else {
		callback(400, {'Error' : 'Given parameters were missing or invalid'});
	}
}

// Test credit card verfication and getting the token
helpers.stripe.cards = {
	'4242424242424242' : 'tok_visa',
	'4000056655665556' : 'tok_visa_debit',
	'5555555555554444' : 'tok_mastercard',
	'2223003122003222' : 'tok_mastercard_debit',
	'5200828282828210' : 'tok_mastercard_prepaid',
	'6200000000000005' : 'tok_unionpay'
}

// Send email using mailgun
helpers.sendMailgunEmail = function(userEmail, emailSubject, emailMessage, callback) {
	// Validate parameters
	var userEmail = typeof(userEmail) == 'string' && userEmail.indexOf("@") > -1 ? userEmail.trim() : false;
	var emailSubject = typeof(emailSubject) == 'string' && emailSubject.length > 0 ? emailSubject.trim() : false;
	var emailMessage = typeof(emailMessage) == 'string' && emailMessage.length > 0 ? emailMessage.trim() : false;

	if(userEmail && emailSubject && emailMessage) {
		// Configure the request payload
		var payload = {
			'from' : "Mailgun Sandbox <postmaster@sandboxda10fc3b805a44a8b4293050a1bcb506.mailgun.org>",
			'to' : "Dear Customer <"+userEmail+">",
			'subject' : emailSubject,
			'text' : emailMessage
		};

		// Stringify the payload
		var stringPayload = querystring.stringify(payload);

		// Configure the request details
		var requestDetails = {
			'protocol' : 'https:',
			'host': 'api.mailgun.net',
			'method' : 'POST',
			'path' : '/v3/sandboxda10fc3b805a44a8b4293050a1bcb506.mailgun.org/messages',
			'auth' : 'api:'+config.mailgun.secretkey,
			'data' : stringPayload,
			'headers' : {
				'Content-type' : 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(stringPayload)
			}
		};

		// Instantiate the request object
		var req = https.request(requestDetails, function(res) {

			// Grab the status of the sent request
			var status = res.statusCode;

			// Callback Successfully if the request went through
			if(status == 200 || status == 201) {
				// Get data from mailgun api
				res.on('data', function(d) {
					// Parse data into readable format
					var data = d.toString();
					// Parse data string into JSON object
					var dataObject = JSON.parse(data);

					callback(status, {"message" : dataObject.message})
				});
			} else {
				res.on('data', function(d) {
					// Parse data into readable format
					var data = d.toString();
					// Parse data string into JSON object
					var dataObject = JSON.parse(data);
					
					callback(status, {"message" : dataObject.message})
				});
			}
		});

		// Bind to the error event so it doesn't get thrown
		req.on('error', function(e) {
			callback(e);
		});

		// Add the payload
		req.write(stringPayload);

		// End the request
		req.end();
	} else {
		callback(400, {'Error' : 'Given parameters were missing or invalid'});
	}
}

// Get the string content of a template
helpers.getTemplate = function(templateName, data, callback) {
	templateName == typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
	data = typeof(data) == 'object' && data !== null ? data : {};
	if(templateName) {
		var templatesDir = path.join(__dirname, './../templates/');
		fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err, str) {
			if(!err && str && str.length > 0) {
				// Do interpolation on the string
				var finalString = helpers.interpolate(str, data);
				callback(false, finalString);
			} else {
				callback('No template could be found');
			}
		});
	} else {
		callback('A valid template was not specified');
	}
};

// Add the universal header and footer to a string, and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function(str, data, callback) {
	str = typeof(str) == 'string' && str.length > 0 ? str : '';
	data = typeof(data) == 'object' && data !== null ? data : {};
	// Get the header
	helpers.getTemplate('_header', data, function(err, headerString) {
		if(!err && headerString) {
			helpers.getTemplate('_footer', data, function(err, footerString) {
				if(!err && footerString) {
					// Add them all together
					var fullString = headerString+str+footerString;
					callback(false, fullString);
				} else {
					callback('Could not find the footer template');
				}
			});
		} else {
			callback('Could not find the header template');
		}
	})
};


// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function(str, data) {
	str = typeof(str) == 'string' && str.length > 0 ? str : '';
	data = typeof(data) == 'object' && data !== null ? data : {};

	// Add the template global to the data object, prepending their key name with "globals"
	for(var keyName in config.templateGlobals) {
		if(config.templateGlobals.hasOwnProperty(keyName)) {
			data['global.'+keyName] = config.templateGlobals[keyName];
		}
	}

	// For each key in the data object, insert its value into the string at the corresponding placeholder
	for(var key in data) {
		if(data.hasOwnProperty(key) && typeof(data[key]) == 'string') {
			var replace = data[key];
			var find = '{'+key+'}';
			str = str.replace(find, replace);
		}
	}

	return str;
};


// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName, callback) {
	fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;

	if(fileName) {
		var publicDir = path.join(__dirname,'./../public/');
		fs.readFile(publicDir+fileName, function(err, data) {
			if(!err && data) {
				callback(false, data);
			} else {
				callback('No file could be found');
			}
		});
	} else {
		callback('A valid file name was not specified');
	}
}

helpers.containsObject = function(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x].itemID === obj.itemID && list[x].itemName === obj.itemName) {
            return true;
        }
    }

    return false;
}

helpers.objectPostion = function(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x].itemID === obj.itemID && list[x].itemName === obj.itemName) {
            return x;
        }
    }

    return false;
}


// Export the module
module.exports = helpers;