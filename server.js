const strings = require('../libs/strings.js');
const utils = require('../libs/utils.js');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;


var app = express();
app.use(express.json());

app.post("/serverLogin", (req, res) => {
	let token = req.body.token;
	var response = {};
	console.log(req.body);
	console.log("Server Login Attempt by "+token);
	if(utils.authenticateClient(token)){
		let id = req.body.id;
		let pwd = req.body.pwd;
		utils.loginUser(id, pwd, res);		//User Auth Response is sent from this called function
	}else {
		response = {
			responseCode: strings.CLIENT_AUTH_FAILED_CODE,
			responseMessage: strings.CLIENT_AUTH_FAILED_MSG
		};
		res.send(response);
	}
});

app.post("/fetchMenu", (req, res) => {
	let token = req.body.token;
	console.log(token);
	if(utils.authenticateClient(token)){
		utils.fetchMenu(res);		//Response will be send by this function
	} else {
		response = {
			responseCode: strings.CLIENT_AUTH_FAILED_CODE,
			responseMessage: strings.CLIENT_AUTH_FAILED_MSG
		};
		res.send(response);
	}
	
})


module.exports.startServer = () => {
	app.listen(strings.PORT, function(){
		console.log("Server is running on port "+ strings.PORT);
	});
}
