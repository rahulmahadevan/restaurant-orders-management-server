module.exports = {
	PORT: 8044,
	URL: 'mongodb://turingmachine:admin123@localhost:27017/',
	DATABASE: 'mongodb://turingmachine:admin123@localhost:27017/cafe?authSource=admin',
	DB_NAME: "cafe",
	DB_USERNAME: "turingmachine",
	DB_PASSWORD: "admin123",

	CLIENT_AUTH_ACCESS_TOKEN: "thisIsATemporaryToken",
	CLIENT_AUTH_SUCCESS_MSG: "ClientAuthenticationSuccessful",
	CLIENT_AUTH_SUCCESS_CODE: 200,
	CLIENT_AUTH_FAILED_MSG: "UnauthorizedClient",
	CLIENT_AUTH_FAILED_CODE: 401,

	USER_LOGIN_SUCCESS_CODE: 200,
	USER_LOGIN_SUCCESS_MSG: "UserAuthenticationSuccessful",
	USER_LOGIN_FAILED_CODE: 401,
	USER_LOGIN_FAILED_MSG: "UnauthorizedUser",

	SERVER_ERROR_CODE: 500,
	SERVER_ERROR_MSG: "InternalServerError",

	ORDER_INSERT_SUCCESS: "OrderInsertedSuccessfully",
	ORDER_INSERT_FAILED: "FailedToInsertOrder",

	ORDER_UPDATE_SUCCESS: "OrderUpdatedSuccessfully",
	ORDER_UPDATE_FAILED: "FailedToUpdateOrder"
}