const https = require('https');
// const path = require('path');
const Parse = require('parse/node');
const http = require('http');
const fs = require('fs');
const url = require('url');
const {parseUserSignup, parseUserLogin} = require("./user.js");
const { get_current_weather, serve_results } = require("./weather.js");
const { addItem } = require("./addItem.js");
const { getClosetItems } = require("./closet.js")


Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

let zipcode = "";

const server = http.createServer();


server.on("listening", () => {});


//request requires JSON   { "zipcode":int }
//response outputs JSON   { "status":string, "high":int, "low":int } */
server.on("request", function(req, res) {
	if (req.method === "POST" && req.url.startsWith("/zipcode"))
	{
		req.on('data', function (data) {
			body = JSON.parse(data.toString('utf8'));
			console.log(body);
		});

		req.on('end', function () {
			get_current_weather(body["zipcode"], res);
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/closet"))
	{
		let body;
		req.on('data', function (data) {
			body = JSON.parse(data.toString('utf8'));
			console.log(body);
		});

		req.on('end', function () {
			getClosetItems(body, res);
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/additem"))
	{
		let body;

		req.on('data', function (data) {
			body = JSON.parse(data.toString('utf8'));
		});

		req.on('end', function () {
			addItem(body, res)
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/signup"))
	{
		let body;
		req.on('data', function (data) {
			body = JSON.parse(data.toString('utf8'));
			console.log(body);
		});
		req.on('end', function () {
			parseUserSignup(body["username"], body["email"], body["password"], body["zipcode"], res);
		});
	}


	else if (req.method === "POST" && req.url.startsWith("/login"))
	{
		let body;
		req.on('data', function (data) {
			body = JSON.parse(data.toString('utf8'));
			console.log(body);
		});
		req.on('end', function () {
			parseUserLogin(body["email"], body["password"], res);
		});
	}
});



server.listen(8080);
