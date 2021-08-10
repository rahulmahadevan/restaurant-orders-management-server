const strings = require('../libs/strings.js');
const MongoClient = require('mongodb').MongoClient;


module.exports.authenticateClient = (token) => {
	let authCheck = (token === strings.CLIENT_AUTH_ACCESS_TOKEN);
	console.log("Client Access Token Valid: "+authCheck);
	return authCheck;
};


module.exports.loginUser = (id, pwd, res) => {
	MongoClient.connect(strings.URL, (err, db) => {
		if(err) throw err;
		var dbo = db.db("cafe");
		dbo.collection("team").find({"id": Number(id), "pwd":pwd}).toArray((err, result) => {
			if(err) throw err;
			if(result[0]){
				console.log("login successful");
				response = {
					responseCode: strings.USER_LOGIN_SUCCESS_CODE,
					responseMessage: strings.USER_LOGIN_SUCCESS_MSG,
					data: {
						name: result[0].name,
						role: result[0].role
					}
				};
			}else {
				console.log("login failed");
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
				if(result[0]){
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

module.exports.putOrder = (orderId, order, res) => {
	MongoClient.connect(strings.URL, (err, db) => {
		if(err) throw err;
		var dbo = db.db("cafe");
		dbo.collection("orders").find({"orderId": orderId}).toArray((err, result) => {
			if(err) throw err;
			if(result[0]){
				console.log("Updating Order:"+orderId);
				//Update order 
				dbo.collection("orders").updateOne({"orderId": orderId}, {$set: order}, (err, result) => {
					if(err) throw err;
					console.log("Order Updated successfully");
					let response = {
						responseCode: 200,
						responseMessage: strings.ORDER_UPDATE_SUCCESS
					}
					res.send(response);
					db.close();
				});
			}else {
				console.log("Inserting New Order:"+orderId);
				//Insert order
				dbo.collection("orders").insertOne(order, (err, result) => {
					if(err) throw err;
					console.log("Order taken successfully");
					let response = {
						responseCode: 200,
						responseMessage: strings.ORDER_INSERT_SUCCESS
					}
					res.send(response);
					db.close();
				});
			}
		});
	});
}

module.exports.fetchOngoingOrders = (status, res) => {
	MongoClient.connect(strings.URL, (err, db) => {
		if(err) throw err;
		var dbo = db.db("cafe");
		dbo.collection("orders").find({"status": status}).toArray((err, result) => {
			if(err) throw err;
			if(result[0]){
				console.log("Orders fetch successful");
				let response = {
					responseCode : 200,
					responseMessage: "OrderFetchSuccessful",
					data : result
				}
				res.send(response);
				db.close();
			}else {
				console.log("Orders fetch failed");
				response = {
					responseCode: 401,
					responseMessage: "Failed"
				};
				res.send(response);
				db.close();
			}
		});
	})
}