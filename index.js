const https = require('https');
// const path = require('path');
const Parse = require('parse/node');
const http = require('http');
const fs = require('fs');
const url = require('url');
const {parseUserSignup, parseUserLogin} = require("./functions/user.js");
const { getCurrentWeather, serveResults } = require("./functions/weather.js");
const { addItem } = require("./functions/addItem.js");
const { getClosetItems } = require("./functions/closet.js")
const { generateOutfit } = require("./functions/generateOutfit.js")


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
		let body;
		req.on('data', function (data) {
			body += data;
			// undefined is part of the data buffer, so we delete that section
			if (body.substr(0, 9) == 'undefined')
			{
				body = body.substr(9, body.length - 9);
			}
		});

		req.on('end', function () {
			// When the data buffers end or there's no more data buffers to be appended
			body = JSON.parse(body.toString('utf8'));
			console.log(body);
			getCurrentWeather(body["zipcode"], res, body["email"]); //body['email']
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/closet"))
	{
		let body;
		req.on('data', function (data) {
			body += data;
			// undefined is part of the data buffer, so we delete that section
			if (body.substr(0, 9) == 'undefined')
			{
				body = body.substr(9, body.length - 9);
			}
		});

		req.on('end', function () {
			body = JSON.parse(body.toString('utf8'));
			console.log(body);
			getClosetItems(body, res);
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/additem"))
	{
		let body;

		req.on('data', function (data) {
			body += data;
			// undefined is part of the data buffer, so we delete that section
			if (body.substr(0, 9) == 'undefined')
			{
				body = body.substr(9, body.length - 9);
			}
		});

		req.on('end', function () 	{		
			body = JSON.parse(body.toString('utf8'));
			addItem(body, res)
		});
	}

	// else if (req.method === "POST" && req.url.startsWith("/signup"))
	// {
	// 	let body;
	// 	req.on('data', function (data) {
	// 		body += data;
	// 		// undefined is part of the data buffer, so we delete that section
	// 		if (body.substr(0, 9) == 'undefined')
	// 		{
	// 			body = body.substr(9, body.length - 9);
	// 		}
	// 	});
	// 	req.on('end', function () {
	// 		body = JSON.parse(body.toString('utf8'));
	// 		console.log(body);
	// 		parseUserSignup(body["username"], body["email"], body["password"], body["zipcode"], res);
	// 	});
	// }


	else if (req.method === "POST" && req.url.startsWith("/login"))
	{
		let body;
		req.on('data', function (data) {
			body += data;
			// undefined is part of the data buffer, so we delete that section
			if (body.substr(0, 9) == 'undefined')
			{
				body = body.substr(9, body.length - 9);
			}
		});
		req.on('end', function () {
			body = JSON.parse(body.toString('utf8'));
			parseUserLogin(body["email"], body["password"], res);
		});
	}

	else if (req.method === "POST" && req.url.startsWith("/generate"))
	{
		let body;
		req.on('data', function (data) {
			body += data;
			// undefined is part of the data buffer, so we delete that section
			if (body.substr(0, 9) == 'undefined')
			{
				body = body.substr(9, body.length - 9);
			}
		});
		req.on('end', function () {
			body = JSON.parse(body.toString('utf8'));
			console.log(body);
			generateOutfit(body, res);
		});
	}
});



server.listen(8080);
