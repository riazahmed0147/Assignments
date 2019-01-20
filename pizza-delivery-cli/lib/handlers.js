/*
 * Request handlers
 *
 */


// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

// Define the handlers
var handlers = {};


/*
 * HTML Handlers
 *
 */

 // Index handler
 handlers.index = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Pizza Delivery - At your door',
            'head.description' : 'We deliver pizza at your door step, just make an order!',
            'body.class' : 'index'
        };

        // Read in a template as a string
        helpers.getTemplate('index', templateData, function(err,str) {
            if(!err && str) {
                // Add the univerisal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if(!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
 };

  // Create Account
 handlers.accountCreate = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Create an Account',
            'head.description' : 'Signup is easy and only takes a few seconds.',
            'body.class' : 'accountCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('accountCreate', templateData, function(err,str) {
            if(!err && str) {
                // Add the univerisal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if(!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
 };

// Create New Session
handlers.sessionCreate = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Login to your account',
            'head.description' : 'Please enter your email and password to access your account.',
            'body.class' : 'sessionCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionCreate', templateData, function(err,str) {
            if(!err && str) {
                // Add the univerisal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if(!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
 };

 // Session Delted
handlers.sessionDeleted = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'You are logged Out',
            'head.description' : 'Please enter your email and password to access your account.',
            'body.class' : 'sessionDeleted'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionDeleted', templateData, function(err,str) {
            if(!err && str) {
                // Add the univerisal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if(!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
 };

// Edit your account
handlers.accountEdit = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Account Settings',
            'body.class' : 'accountEdit'
        };

        // Read in a template as a string
        helpers.getTemplate('accountEdit', templateData, function(err,str) {
            if(!err && str) {
                // Add the univerisal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if(!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Show all menu items
handlers.menuShow = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Pizza Menu',
      'head.description' : 'Select your pizza from the list',
      'body.class' : 'menuShow'
    };
    // Read in a template as a string
    helpers.getTemplate('menuShow',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Show all menu items
handlers.cartShow = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Cart items',
      'head.description' : 'Check your pizza cart',
      'body.class' : 'cartShow'
    };
    // Read in a template as a string
    helpers.getTemplate('cartShow',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Show all menu items
handlers.userCheckout = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Checkout',
      'body.class' : 'userCheckout'
    };
    // Read in a template as a string
    helpers.getTemplate('userCheckout',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Payment was successful
handlers.paymentSuccess = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Checkout',
      'body.class' : 'paymentSuccess'
    };
    // Read in a template as a string
    helpers.getTemplate('paymentSuccess',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};



 // Favicon
handlers.favicon = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', function(err, data) {
            if(!err && data) {
                // Callback the data
                callback(200, data, 'favicon');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
    }
};

// Public Assets
handlers.public = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Get the filename being request
        var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
        if(trimmedAssetName.length > 0) {
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName, function(err, data) {
                if(!err && data) {
                    // Determine the content type (default to plain text)
                    var contentType = 'plain';

                    if(trimmedAssetName.indexOf('.css') > -1) {
                        contentType = 'css';
                    }


                    if(trimmedAssetName.indexOf('.png') > -1) {
                        contentType = 'png';
                    }


                    if(trimmedAssetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    }


                    if(trimmedAssetName.indexOf('.ico') > -1) {
                        contentType = 'favicon';
                    }

                    // Callback the data
                    callback(200, data, contentType);
                } else {
                    callback(404);
                }
            });
        } else {
            callback(404)
        }
    } else {
        callback(405);
    }
}


/*
 * JSON API handlers
 *
 */


// Users
handlers.users = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, email, phone, password, street address, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback) {
    // Check that all required fields are filled out
    var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var email = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    var address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
    var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement == true ? true : false;

    if (firstName && lastName && email && phone && address && password && tosAgreement) {
        // Make that the user doesn't already exist
        _data.read('users', email, function(err, data) {
            if (err) {
                // Hash the password
                var hashedPassword = helpers.hash(password);

                // Create the user object
                if (hashedPassword) {
                    var userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'email': email,
                        'phone': phone,
                        'address': address,
                        'hashedPassword': hashedPassword,
                        'tosAgreement': true
                    };

                    // Store the user
                    _data.create('users', email, userObject, function(err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, {
                                'Error': 'Could not create the new user'
                            })
                        };
                    });
                } else {
                    callback(500, {
                        'Error': 'Could not hash the user\'s password'
                    });
                };

            } else {
                // User already exist
                callback(400, {
                    'Error': 'A user with that email address already exists'
                });
            };
        });
    } else {
        callback(400, {
            'Error': 'Missing required fields'
        });
    }
};

// Users - get
// Required data: email
// Optional data: none
handlers._users.get = function(data, callback) {
    // Check that the email address is valid
    var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.indexOf("@") > -1 ? data.queryStringObject.email.trim() : false;
    if (email) {
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Verify that the given is valid for the email address
        handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
            if (tokenIsValid) {
                // Lookup the user
                _data.read('users', email, function(err, data) {
                    if (!err && data) {
                        // Remove the hashed password from the user object before returning it to the requester
                        delete data.hashedPassword;
                        callback(200, data);
                    } else {
                        callback(404);
                    }
                })
            } else {
                callback(403, {
                    'Error': 'Missing required token in header, or token is invalid'
                })
            }
        })
    } else {
        callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Users - put
// Required data : email
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function(data, callback) {
    // Check for the required field
    var email = typeof(data.payload.email) == 'string' && data.payload.email.indexOf("@") > -1 ? data.payload.email.trim() : false;

    // Check for the optional fields
    var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;

    if (email) {
        if (firstName || lastName || password || phone || address) {
            // Get the token from the headers
            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            // Verify that the given is valid for the phone number
            handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
                if (tokenIsValid) {
                    // Lookup the user
                    _data.read('users', email, function(err, userData) {
                        if (!err && userData) {
                            // Update the fields necessary
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (email) {
                                userData.phone = phone;
                            }
                            if (password) {
                                userData.hashedPassword = helpers.hash(password);
                            }
                            if (address) {
                                userData.address = address;
                            }
                            // Store the new updates
                            _data.update('users', email, userData, function(err) {
                                if (!err) {
                                    callback(200);
                                } else {
                                    callback(500, {
                                        'Error': "Could not update the user"
                                    });
                                }
                            })
                        } else {
                            callback(400, {
                                'Error': 'The specified user does not exist'
                            })
                        }
                    })
                } else {
                    callback(403, {
                        'Error': 'Missing required token in header, or token is invalid'
                    })
                }
            })

        } else {
            callback(400, {
                'Error': 'Missing fields to update'
            })
        }
    } else {
        callback(400, {
            'Error': 'Missing required field'
        })
    }

};

// Users - delete
// Required field : email
handlers._users.delete = function(data, callback) {
    // Check that the email address is valid
    var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.indexOf("@") > -1 ? data.queryStringObject.email.trim() : false;
    if (email) {
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given is valid for the email address
        handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
            if (tokenIsValid) {
                // Lookup the user
                _data.read('users', email, function(err, userData) {
                    if (!err && userData) {
                        _data.delete('users', email, function(err) {
                            if (!err) {
                                callback(200);                                
                            } else {
                                callback(500, {
                                    'Error': 'Could not delete the specified user'
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            'Error': 'Could not find the specified user'
                        });
                    }
                });
            } else {
                callback(403, {
                    'Error': 'Missing required token in header, or token is invalid'
                })
            }
        })
    } else {
        callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Tokens
handlers.tokens = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for all the tokens methods
handlers._tokens = {};


// Tokens - post
// Required data: email, password
// optional data: none
handlers._tokens.post = function(data, callback) {
    var email = typeof(data.payload.email) === 'string' && data.payload.email.indexOf("@") > -1 ? data.payload.email.trim() : false;
    var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    if (email && password) {
        // Lookup the user who matches that email address
        _data.read('users', email, function(err, userData) {
            if (!err && userData) {
                // Hash the sent password, and compare it to the password stored in user's object
                var hashedPassword = helpers.hash(password);
                if (hashedPassword == userData.hashedPassword) {
                    // If valid, create a new token with a random name. Set expiration date 1 hour in the future
                    var tokenId = helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'email': email,
                        'id': tokenId,
                        'expires': expires
                    };

                    // Store the token
                    _data.create('tokens', tokenId, tokenObject, function(err) {
                        if (!err) {
                            callback(200, tokenObject);
                        } else {
                            callback(500, {
                                'Error': 'Could not create the new token'
                            });
                        }
                    });
                } else {
                    callback(400, {
                        'Error': 'Password did not match the specified user\'s stored password'
                    });
                }
            } else {
                callback(400, {
                    'Error': 'Could not find the specified user'
                });
            }
        });
    } else {
        callback(400, {
            'Error': 'Missing required field(s)'
        });
    }
};

// Tokens - get
// Required data : id
// Optional data: none
handlers._tokens.get = function(data, callback) {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    
    if (id) {
        // Lookup the token
        _data.read('tokens', id, function(err, tokenData) {
            if (!err && tokenData) {
                callback(200, tokenData);
            } else {
                callback(404);
            }
        })

    } else {
        callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Tokens - put
// Required data : id, extend
// Optional data : none
handlers._tokens.put = function(data, callback) {
    var id = typeof(data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
    var extend = typeof(data.payload.extend) === 'boolean' && data.payload.extend === true ? true : false;
    
    if (id && extend) {
        // Lookup the token
        _data.read('tokens', id, function(err, tokenData) {
            if (!err && tokenData) {
                // Check to the make sure the token isn't already expired
                if (tokenData.expires > Date.now()) {
                    // Set the expiration an hour from now
                    tokenData.expires = Date.now() + 1000 * 60 * 60;

                    // Store the new updates
                    _data.update('tokens', id, tokenData, function(err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, {
                                'Error': 'Could not update the token\'s expiration'
                            })
                        }
                    });
                } else {
                    callback(400, {
                        'Error': 'The token has already expired, and cannot be extended'
                    })
                }
            } else {
                callback(400, {
                    'Error': 'Specified token does not exist'
                })
            }
        });
    } else {
        callback(400, {
            'Error': 'Missing required field(s) or field(s) are invalid'
        });
    }
};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data, callback) {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    
    if (id) {
        // Lookup the token
        _data.read('tokens', id, function(err, data) {
            if (!err && data) {
                _data.delete('tokens', id, function(err) {
                    if (!err) {
                        callback(200);
                    } else {
                        callback(500, {
                            'Error': 'Could not delete the specified token'
                        });
                    }
                });
            } else {
                callback(400, {
                    'Error': 'Could not find the specified token'
                });
            }
        });
    } else {
        callback(400, {
            "Error": "Missing required field"
        });
    }
};


// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id, email, callback) {
    // Lookup the token

    _data.read('tokens', id, function(err, tokenData) {
        if (!err && tokenData) {
            // Check that the token is for the given user and has not expired
            if (tokenData.email == email && tokenData.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};


// Menu items
handlers.menu = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._menu[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for the menu submethods
handlers._menu = {};

// Menu - post
// Required data: email, item
// optional data: none
handlers._menu.post = function(data, callback) {
    var email = typeof(data.payload.email) === 'string' && data.payload.email.indexOf("@") > -1 ? data.payload.email.trim() : false;
	var item = typeof(data.payload.item) === 'string' && data.payload.item.trim().length > 0 ? data.payload.item.trim() : false;

    if (email && item) {
    	 // Get the token from the headers
   		var id = typeof(data.headers.token) == 'string' ? data.headers.token : false;

   		handlers._tokens.verifyToken(id, email, function(tokenIsValid) {
   			if(tokenIsValid) {
   				// Lookup the menu items
	            _data.read('menu', "items", function(err, menuItems) {
	            	// Check if item is in the menu list
	            	var isItemExistInMenu = menuItems.hasOwnProperty(item) ? true : false;

	                if (!err && isItemExistInMenu) {
                    	// Look up the user cart
				        _data.read('cart', id, function(err, cartItems) {			        	
				            if (err) {
	               				// Add item in the cart
		                        var cartObject = {
		                            'email': email,
		                            'id': id,
		                            'menuItems': [{'itemID' : item, 'itemName': menuItems[item]}]
		                        };
		                        // Store the item in the cart
		                        _data.create('cart', id, cartObject, function(err) {
		                            if (!err) {
		                                callback(200, {
		                                    'Success' : 'Item added in the cart'
		                                });
		                            } else {
		                                callback(500, {
		                                    'Error': 'Could not add item in the cart'
		                                });
		                            }
		                        });	  
				            } else {

				            	// Check if menu item already doesn't exist
                                var menuItem = {'itemID' : item, 'itemName': menuItems[item]};
                                var isItemExistInCart  = helpers.containsObject(menuItem, cartItems.menuItems)

	                            if(isItemExistInCart){
				                	// Item already exist
					                callback(400, {
					                    'Error': 'Item already exist'
					                });
				                } else {
				                	// Update the cart
		                            if (item) {
		                                cartItems.menuItems.push({'itemID' : item, 'itemName': menuItems[item]});
		                            }

		                            // Add item to the cart
		                            _data.update('cart', id, cartItems, function(err) {
		                                if (!err) {
		                                    callback(200, {
		                                    	'Success' : 'Item added in the cart'
		                                    });
		                                } else {
		                                    callback(500, {
		                                        'Error': 'Could not add item in the cart'
		                                    });
		                                }
		                            });
				                }
				            };
				        });
	                } else {
	                    callback(404);
	                }
	            });   				
   			} else {
	            callback(403, {
              	  'Error': 'Missing required token in header, or token is invalid'
            	});	      	  	
   			}
   		})
        
    } else {
        callback(400, {
            'Error': 'Missing required fields'
        });
    }
};

// Menu Items - get
// Required data: email
// Optional data: none
handlers._menu.get = function(data, callback) {
    // Check that the email address is valid
    var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.indexOf("@") > -1 ? data.queryStringObject.email.trim() : false;

    if (email) { 
        // Get the token from the headers
    	var id = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    	// Verify that the given is valid for the email address
	    handlers._tokens.verifyToken(id, email, function(tokenIsValid) {
	        if (tokenIsValid) {
	            // Lookup the menu items
	            _data.read('menu', "items", function(err, data) {
	                if (!err && data) {
	                    // Displaying all the menu items to the requester
	                    callback(200, data);
	                } else {
	                    callback(500, {'Error':'Could not read the cart items'});
	                }
	            })
	        } else {
	            callback(403, {
	                'Error': 'Missing required token in header, or token is invalid'
	            })
	        }
	    })
    } else {
    	callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Menu Items - delete
// Required data : item, email
// Optional data : none
handlers._menu.delete = function(data, callback) {
	var item = typeof(data.payload.item) === 'string' && data.payload.item.trim().length > 0 ? data.payload.item.trim() : false;
	var email = typeof(data.payload.email) == 'string' && data.payload.email.indexOf("@") > -1 ? data.payload.email.trim() : false;

    if (item && email) {
    	// Get the token from the headers
    	var id = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    	// Verify that the given is valid for the email address
	    handlers._tokens.verifyToken(id, email, function(tokenIsValid) {
	        if (tokenIsValid) {
	        	 // Lookup the menu items
		        _data.read('menu', "items", function(err, menuItems) {
		        	// Check if item is in the menu list
		        	var isItemExistInMenu = menuItems.hasOwnProperty(item) ? true : false;

		            if (!err && isItemExistInMenu) {
		            	// Look up the user cart
				        _data.read('cart', id, function(err, cartItems) {		        	
				            if (!err && cartItems) {

                                // Check if menu item already doesn't exist
                                var menuItem = {'itemID' : item, 'itemName': menuItems[item]};
                                var isItemExistInCart  = helpers.containsObject(menuItem, cartItems.menuItems)

                                if(isItemExistInCart) {

                                    // Get item position
                                    var checkPosition = helpers.objectPostion(menuItem, cartItems.menuItems);
                                    // Remove the item from the cart
                                    if (checkPosition) {
                                        cartItems.menuItems.splice(checkPosition, 1);
                                        // Update cart
			                            _data.update('cart', id, cartItems, function(err) {
			                                if (!err) {
			                                    callback(200, {
			                                    	'Cart': cartItems.menuItems
			                                    });
			                                } else {
			                                    callback(500, {
			                                        'Error': 'Could not delete item from the cart'
			                                    });
			                                }
			                            });
                                    } else {
                                        callback(404, {
                                            'Error': 'Could not find the item on the user cart, so could not remove it'
                                        })
                                    }	                	
				                } else {
					                callback(404);                            
				                }
				            } else {
				            	callback(500, {
				            		'Error' : 'Error reading cart items'
				            	})
				            };
				        });
		            } else {
		                callback(404);
		            }
		        });
	        } else {
	            callback(403, {
	                'Error': 'Missing required token in header, or token is invalid'
	            })
	        }
	    });
    } else {
        callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Menu items
handlers.cart = function(data, callback) {
    var acceptableMethods = ['get'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._cart[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for the menu submethods
handlers._cart = {};

// Cart Items - get
// Required data: email
// Optional data: none
handlers._cart.get = function(data, callback) {
    // Check that the email address is valid
    var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.indexOf("@") > -1 ? data.queryStringObject.email.trim() : false;

    if (email) { 
        // Get the token from the headers
    	var id = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    	// Verify that the given is valid for the phone number
	    handlers._tokens.verifyToken(id, email, function(tokenIsValid) {
	        if (tokenIsValid) {
	            // Lookup the menu items
	            _data.read('cart', id, function(err, cartData) {
	                if (!err && cartData) {
	                    // Displaying all the cart items to the requester
	                    callback(200, {
	                    	'cart' : cartData.menuItems
	                    });
	                } else {
	                    callback(400, {'Error' : 'Your cart is empty, please buy some pizza!'});
	                }
	            })
	        } else {
	            callback(403, {
	                'Error': 'Missing required token in header, or token is invalid'
	            })
	        }
	    })
    } else {
    	callback(400, {
            "Error": "Missing required field"
        });
    }
};

// Checkout
handlers.checkout = function(data, callback) {
    var acceptableMethods = ['post'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._checkout[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for the checkout submethods
handlers._checkout = {};

// User checkout - post
// Required data - cardNumber, expirationMonth, ExpirationYear, securityCode (CVC), zipCode
// Optional data: none
handlers._checkout.post = function(data, callback) {
    var email = typeof(data.payload.email) == 'string' && data.payload.email.indexOf("@") > -1 ? data.payload.email.trim() : false;
    var cardNumber = typeof(data.payload.cardNumber) == 'string' && data.payload.cardNumber.trim().length === 16 ? data.payload.cardNumber.trim() : false;
    var expirationMonth = typeof(data.payload.expirationMonth) == 'string' && data.payload.expirationMonth.trim().length === 2 ? data.payload.expirationMonth.trim() : false;
    var expirationYear = typeof(data.payload.expirationYear) == 'string' && data.payload.expirationYear.trim().length === 4 ? data.payload.expirationYear.trim() : false;
    var securityCode = typeof(data.payload.securityCode) == 'string' && data.payload.securityCode.trim().length === 3 ? data.payload.securityCode.trim() : false;
    var zipCode = typeof(data.payload.zipCode) == 'string' && data.payload.zipCode.trim().length === 6 ? data.payload.zipCode.trim() : false;
    

    if (email && cardNumber && expirationMonth && expirationYear && securityCode && zipCode) {
         // Get the token from the headers
        var id = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        handlers._tokens.verifyToken(id, email, function(tokenIsValid) {
            if(tokenIsValid) {
                // Look up the user cart
                _data.read('cart', id, function(err, cartData) {                     
                    if (!err && cartData) {
                       // Check cart items are not empty
                       var itemsInTheCart = cartData.menuItems.length;

                       if(itemsInTheCart > 0) {
                            // proceed to checkout                            
                            var totalCost = itemsInTheCart * 50; // Assume that each pizza costs 50 cents, minimum to pay
                              // Stripe payment API
                            helpers.stripe.payment(cardNumber, expirationMonth, expirationYear, securityCode, zipCode, totalCost, function(status, message) {
                                
                                // Check for transaction is successful
                                if(status == 200 || status == 201) {

                                    // Parse message string into JSON
                                    var messageObject = JSON.parse(message);

                                    // get user email
                                    var userEmail = cartData.email;

                                    // email subject
                                    var subject = "Pizza order receipt";

                                    // order receipt
                                    var orderStatus = messageObject.status;
                                    var paymentMethod = messageObject.source.brand;
                                    var orderDate = Date.now();
                                    var totalAmount = messageObject.amount;

                                    // Generate order receipt
                                    var receipt = "Order Status: "+orderStatus+"\nPayment Method: "+paymentMethod+"\nOrder Date: "+orderDate+"\nTotal Amount: "+totalAmount;

                                    // Send email to user
                                    helpers.sendMailgunEmail(userEmail, subject, receipt, function(status, message) {
                                        if(status == 200 || status == 201) {
                                           
                                            _data.delete('cart', id, function(err) {
                                                if (!err) {
                                                    callback(status, message)
                                                } else {
                                                    callback(500, {
                                                        'Error': 'Could not delete the cart'
                                                    });
                                                }
                                            });
                                        } else {
                                             callback(status, message)
                                        }
                                    });                                    
                                } else {
                                     callback(status, message)
                                }                           
                            });
                       } else {
                            callback(400, {
                                'Error' : 'Cart is empty'
                            });
                       }

                    } else {
                        callback(500, {
                            'Error' : 'Could not read cart items'
                        })
                    };
                });                
            } else {
                callback(403, {
                  'Error': 'Missing required token in header, or token is invalid'
                });             
            }
        })
        
    } else {
        callback(400, {
            'Error': 'Missing required fields'
        });
    }
};


// Ping hanlder
handlers.ping = function(data, callback) {
    callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};


// Exports the handlers
module.exports = handlers;



// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength) {
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    
    if (strLength) {
        // Define all the possible characters that could go into a string
        var possibleCharacters = 'abcdefghijklmnopqrstuvwxzy0123456789';

        // Start the final string
        var str = '';
        for (i = 1; i <= strLength; i++) {
            // Get a random character from the possibleCharacters string
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

            // Append this character to the final string
            str += randomCharacter;
        }

        // return the final string
        return str;
    } else {
        return false;
    }
}