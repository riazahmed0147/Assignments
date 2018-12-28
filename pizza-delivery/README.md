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

#### Create Token
**Method**: POST
**URL**: localhost:3000/tokens
**Payload**:
```
{
	"email" : "youremail@xyz.com",
	"password" : "thisIsAPassword"
}
```

#### Get User
* **Method**: GET
* **URL**: localhost:3000/users?email=youremail@xyz.com
* **Header**: key => token , value => tokenYouCreated


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
* **Method**: Delete
* **URL**: localhost:3000/users?email=youremail@xyz.com
* **Header**: key => token , value => tokenYouCreated