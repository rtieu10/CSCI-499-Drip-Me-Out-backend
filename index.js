const https = require('https');
// const path = require('path');
const Parse = require('parse/node');
const http = require('http');
const fs = require('fs');
const url = require('url');


const { api_key } = require('./credential.json');

Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

let zipcode = "";

const server = http.createServer();

server.on("listening", () => {});

server.on("request", function(req, res) {
	if (req.method === "POST" && req.url.startsWith("/zipcode"))
	{
		let body = '';

		req.on('data', function (data) {
			body += data;
			if (body.length > 1e6)
			{
				request.connection.destroy();
			}
		});

		req.on('end', function () {
			zipcode = body;
			get_current_weather(res);
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
	else if (req.method === "POST" && req.url.startsWith("/additem"))
	{
		let body = '';
		let item = "";

		req.on('data', function (data) {
			body += data;
		});

		req.on('end', function () {
			item = body;
			addtodb();
		});

		function addtodb() {
			let counter = 0;
			let counter2 = 0;
			let type = "";
			let category = "";
			let label = "";
			let color = "";
			let img_base_64 = "";
			let email = "";
			let password = "";
			for (let i = 0; i < item.length; i++)
			{
				if (item[i] === "&" && counter2 === 0)
				{
					type = item.substr(counter, i);
					counter2++;
					counter = i + 1;
				}
				else if (item[i] === "&" && counter2 === 1)
				{
					category = item.substr(counter, i - counter);
					counter2++;
					counter = i + 1;
				}
				else if (item[i] === "&" && counter2 === 2)
				{
					label = item.substr(counter, i - counter);
					counter2++;
					counter = i + 1;
				}
				else if (item[i] === "&" && counter2 === 3)
				{
					color = item.substr(counter, i - counter);
					counter2++;
					counter = i + 1;
				}
				else if (item[i] === "&" && counter2 === 4)
				{
					img_base_64 = item.substr(counter, i - counter);
					counter2++;
					counter = i + 1;
				}
				else if (item[i] === "&" && counter2 === 5)
				{
					email = item.substr(counter, i - counter);
					password = item.substr(i + 1, item.length - i + 1);
					counter2++;
					counter = i + 1;
				}
			}
			let actual_base_64 = img_base_64.substr("data:image/jpeg;base64,".length, img_base_64.length - "data:image/jpeg;base64,".length);

			const ClothingItem = Parse.Object.extend("ClothingItem");
			const query = new Parse.Query(ClothingItem);
			async function find_clothing_item() {
				const results = await query.find();
				let i = 0;
				let recorded = false;
				function check_item()
				{
					query.get(results[i].id).then((item) => {
						let stored_email = item.get('email');
						let stored_base64 = item.get('imagedata');
						let stored_password = item.get('password');
						if (stored_base64 === actual_base_64 && stored_email === email && stored_password === password)
						{
							res.write("recorded");
							res.end();
						}
						else if (i < results.length - 1) {
							i++;
							check_item();
						}
						else if (i + 1 === results.length)
						{
							res.write("added");
							res.end();
							add_clothing_item(actual_base_64, label, category, type, color, email, password);
						}

					}, (error) => {
						console.log('user not retrieved, error');
					});
				}
				check_item();
			};
			find_clothing_item();

		}
	}
	else if (req.method === "POST" && req.url.startsWith("/signup"))
	{
		let email = "";
		let password = "";

		let login_info = "";
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			login_info = body;
			for (let i = 0; i < login_info.length; i++)
			{
				if (login_info[i] === "&")
				{
					email = login_info.substr(0, i);
					password = login_info.substr(i + 1, login_info.length);
					break;
				}
			}

			user_search(email, password, res);
		});
	}
	else if (req.method === "POST" && req.url.startsWith("/login"))
	{
		let login_info = "";
		let body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			login_info = body;
			for (let i = 0; i < login_info.length; i++)
			{
				if (login_info[i] === "&")
				{
					email = login_info.substr(0, i);
					password = login_info.substr(i + 1, login_info.length);
					break;
				}
			}
			let loginpage = true;
			user_search(email, password, res, loginpage);
		});
	}
});

function user_search(email, password, res, loginpage)
{
	const Users = Parse.Object.extend("Users");
	const query = new Parse.Query(Users);
	async function find_user() {
		const results = await query.find();
		let i = 0;
		let recorded = false;
		function check_user()
		{
			query.get(results[i].id).then((user) => {
				let db_email = user.get("email");
				let db_password = user.get("password");
				if (db_email === email && db_password === password)
				{
					let db_email = user.get("email");
					let db_password = user.get("password");

					res.write("verified");
					res.end();
					recorded = true;
				}
				if (i < results.length - 1)
				{
					i++;
					check_user();
				}
				else 
				{
					if (!recorded && !loginpage)
					{
						let user_to_db = new Parse.Object("Users");
						user_to_db.set("email", email);
						user_to_db.set("password", password);
						user_to_db.save();
						res.write("signedup")
						res.end();
					}
					if (loginpage)
					{
						res.write("unsuccessful");
						res.end();
					}
				}
			}, (error) => {
				console.log('user not retrieved, error');
			});
		}
		check_user();
	};
	find_user();
}

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

let weather_status = "";
let low = "";
let high = "";

function get_current_weather(res){
	let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api_key}`;
	https.request(`${endpoint}`, {method:"GET"}, process_stream).end();
	function process_stream(weather_stream){
		let weather_data = "";
		weather_stream.on("data", chunk => weather_data += chunk);
		weather_stream.on("end", () => {
			serve_results(weather_data, res);
		});
	}
}

function serve_results(weather_data, res){
	weather = JSON.parse(weather_data);
	low = ((weather.main.temp_min - 273.15) * 9) / 5 + 32;
	high = ((weather.main.temp_max - 273.15) * 9) / 5 + 32;
	weather_status = weather.weather[0].main.toLowerCase();
	low = Math.round(low);
	high = Math.round(high);
	res.write(`The weather is ${weather_status} with a high of ${high} °F and a low of ${low} °F.`);
	res.end();
}
