const strings = require('../libs/strings.js');
const MongoClient = require('mongodb').MongoClient;


module.exports.authenticateClient = (token) => {
	let authCheck = (token === strings.CLIENT_AUTH_ACCESS_TOKEN);
	console.log(authCheck);
	return authCheck;
};


module.exports.loginUser = (id, pwd, res) => {
	MongoClient.connect(strings.URL, (err, db) => {
		if(err) throw err;
		var dbo = db.db("cafe");
		dbo.collection("team").find({"id": Number(id), "pwd":pwd}).toArray((err, result) => {
			if(err) throw err;
			console.log(result[0]);
			if(result[0]){
				console.log("login attempt success");
				response = {
					responseCode: strings.USER_LOGIN_SUCCESS_CODE,
					responseMessage: strings.USER_LOGIN_SUCCESS_MSG,
					data: {
						name: result[0].name,
						role: result[0].role
					}
				};
			}else {
				console.log("login attempt failed");
				response = {
					responseCode: strings.USER_LOGIN_FAILED_CODE,
					responseMessage: strings.USER_LOGIN_FAILED_MSG
				};
			}
			db.close();
			res.send(response);
		});
	});
};

module.exports.fetchMenu = (res) => {
	MongoClient.connect(strings.URL, (err, db) => {
			if(err) throw err;
			var dbo = db.db("cafe");
			dbo.collection("menu").find().toArray((err, result) => {
				if(err) throw err;
				if(result){
					console.log("Menu fetch successful");
					response = {
						responseCode: 200,
						responseMessage: "Success",
						data: result
					}
				}else {
					console.log("Menu fetch failed");
					response = {
						responseCode: 401,
						responseMessage: "Failed"
					};
				}
				db.close();
				res.send(response);
			});
		});
}