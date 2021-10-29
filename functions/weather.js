const http = require('http');
const https = require('https');

const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1", "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W", "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

const { apiKey } = require('../credential.json');

//Retrieves data from weather api
function getCurrentWeather(zipCode, res, email) { // email
	let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
	https.request(`${endpoint}`, { method: "GET" }, processStream).end();
	function processStream(weatherStream) {
		let weatherData;
		weatherStream.on("data", apiData => weatherData = apiData);
		weatherStream.on("end", () => {
			console.log(JSON.parse(weatherData));
			serveResults(weatherData, res, email); //email
		});
	}
}

//Formats data to send back response
function serveResults(weatherData, res, email) { // email
	weather = JSON.parse(weatherData);
	let low = ((weather.main.temp_min - 273.15) * 9) / 5 + 32;
	let high = ((weather.main.temp_max - 273.15) * 9) / 5 + 32;
	let weatherStatus = weather.weather[0].main.toLowerCase();
	low = Math.round(low);
	high = Math.round(high);


	let data = JSON.stringify({
		"status": weatherStatus,
		"high": high,
		"low": low
	});
	res.end(data);
}


module.exports = { getCurrentWeather };
