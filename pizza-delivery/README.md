# Homework assignment 02

## Prerequisite
Before starting app please do the following:
1. Install SSL in the https folder
2. Create accounts for API keys (Stripe and Mailgun) please use same email for creating user account in this API and mailgun account
3. Add your API keys for Stripe and Mailgun in the `/lib/config.js` file
4. Install Postman for handling request
5. Node JS 8.X.X installed in the system
6. No NPM used so don't worry about it

## How interact with API
This is a pizza delivery API, without GUI.

* Start the server: `node index.js`


## User

#### Create User
* **Method**: POST
* **URL**: localhost:3000/users
* **Payload**:
```
{
	"firstName" : "firstName",
	"lastName" : "lastName",
	"email" : "youremail@xyz.com",
	"phone" : "4158375309",
	"address" : "street xyz, abc state",
	"password" : "thisIsAPassword",
	"tosAgreement" : true
}
```

#### Edit User
* **Method**: PUT
* **URL**: localhost:3000/users
* **Required**: email
* **Header**: key => token , value => tokenYouCreated
* **Optional**: firstName, lastName, password (at least one must be specified)
* **Payload**: 
```
{
	"firstName" : "firstNameEdited",
	"lastName" : "lastNameEdited",
}
```

#### Delete User
* **Method**: DELETE
* **URL**: localhost:3000/users?email=youremail@xyz.com
* **Header**: key => token , value => tokenYouCreated


#### Create Token
* **Method**: POST
* **URL**: localhost:3000/tokens
* **Payload**:
```
{
	"email" : "youremail@xyz.com",
	"password" : "thisIsAPassword"
}
```

## Token

#### Get Token
* **Method**: GET
* **URL**: localhost:3000/tokens?id=tokenYouCreated

#### Edit Token
* **Method**: PUT
* **URL**: localhost:3000/tokens
* **Payload**:
```
{
	"id" : "tokenYouCreated",
	"extend" : true
}
```

#### Delete Token
* **Method**: DELETE
* **URL**: localhost:3000/tokens?id=tokenYouCreated

#### Get User
* **Method**: GET
* **URL**: localhost:3000/users?email=youremail@xyz.com
* **Header**: key => token , value => tokenYouCreated

## Menu

#### Get Menu Items
* **Method** : GET
* **URL**: localhost:3000/menu?email=youremail@xyz.com
* **Header**:  key => token , value => tokenYouCreated

#### Add Item (1 to 5 items can be inserted)
* **Method** : POST
* **URL**: localhost:3000/menu?item=Item1
* **Header**:  key => token , value => tokenYouCreated
* **Payload**: 
```
{
	"email" : "youremail@xyz.com",
}
```

#### Delete Item
* **Method** : DELETE
* **URL**: localhost:3000/menu?item=Item1
* **Header**:  key => token , value => tokenYouCreated
* **Payload**: 
```
{
	"email" : "youremail@xyz.com",
}
```

## Cart

#### View Cart
* **Method** : GET
* **URL**: localhost:3000/cart?email=youremail@xyz.com
* **Header**:  key => token , value => tokenYouCreated

## Checkout

#### Checkout
* **Method** : POST
* **URL**: localhost:3000/checkout?email=youremail@xyz.com
* **Header**:  key => token , value => tokenYouCreated
* **Payload**: 
```
{
	"cardNumber" : "6200000000000005",
	"expirationMonth" : 10,
	"expirationYear" : 2019,
	"securityCode" : 123,
	"zipCode" : "001234"
}
```
**Please Note:** Only Accepted Cards for testing
```
	4242424242424242, 4000056655665556, 5555555555554444, 2223003122003222, 5200828282828210,
	'6200000000000005, 6200000000000005
```