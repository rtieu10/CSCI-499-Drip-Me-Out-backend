const https = require('https');
// const path = require('path');
const Parse = require('parse/node');
const http = require('http');
const fs = require('fs');
const url = require('url');
const {parseUserSignup, parseUserLogin} = require("./user.js")
const { get_current_weather, serve_results } = require("./weather.js")
const { addImage, addItem } = require("./addItem.js")


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
		let body = '';
		let user = "";

		req.on('data', function (data) {
			body += data;
		});

		req.on('end', function () {
			user = body;
			send_closet_items();
		});

		function send_closet_items() {

			let email = "";
			let password = "";

			for (let i = 0; i < user.length; i++)
			{
				if (user[i] === "&")
				{
					email = user.substr(0, i);
					password = user.substr(i + 1, user.length - i);
				}
			}

			const ClothingItem = Parse.Object.extend("ClothingItem");
			const query = new Parse.Query(ClothingItem);
			async function find_items() {
				const results = await query.find();
				let i = 0;
				function get_image_path() {
					query.get(results[i].id).then((clothingItem) => {
						let image_data = clothingItem.get("imagedata");
						let image_email = clothingItem.get("email");
						let image_password = clothingItem.get("password");
						let image_objectid = results[i].id;
						if (email === image_email && password === image_password)
						{
							res.write(image_data + image_objectid + "*");
						}
						if (i < results.length - 1)
						{
							i++;
							get_image_path();
						}
						else {
							res.end();
						}
					}, (error) => {
						console.log('item not retrieved, error');
					});
				}
				get_image_path();
			}
			find_items();
		}
	}
	else if (req.method === "POST" && req.url.startsWith("/addimage"))
	{
		let body = '';

		req.on('data', function (data) {
			body += data;
		});

		req.on('end', function () {
			addImage(body, res)
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

// function base64_encode(file)
// {
// 	const bitmap = fs.readFileSync(file);
// 	return new Buffer(bitmap).toString('base64');
// }

function add_clothing_item(imagedata, name, category, type, color, email, password)
{
	let image_to_db = new Parse.Object("ClothingItem");
	image_to_db.set("name", name);
	image_to_db.set("imagedata", imagedata);
	image_to_db.set("category", category);
	image_to_db.set("type", type);
	image_to_db.set("color", color);
	image_to_db.set("email", email);
	image_to_db.set("password", password);
	image_to_db.save();
}
