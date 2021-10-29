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

	let avg = (high + low) / 2;

	getWeatherOutfit(email, avg, weatherStatus);

	let data = JSON.stringify({
		"status": weatherStatus,
		"high": high,
		"low": low
	});
	res.end(data);
}

async function getWeatherOutfit(email, avg, weatherStatus) {
	const ClothingItem = Parse.Object.extend("ClothingItem");
	const query = new Parse.Query(ClothingItem);
	query.equalTo("email", email)
	const results = await query.find()

	let outfit = [];

	let item_randomizer = [];

	let items = organizeCatagories(results);
	if (avg <= 35) {
		item_randomizer = item_randomizer.concat(items.sweaters);
		item_randomizer = item_randomizer.concat(items.hoodies);
		item_randomizer = item_randomizer.concat(items.jackets);
		item_randomizer = item_randomizer.concat(items.long_sleeve);
		let randomIndex = Math.floor(Math.random() * results.short_sleeve.length);
		let randomShortSleeveItem =  results.short_sleeve[randomIndex];
		outfit.push(randomShortSleeveItem);
	}
	else if (avg < 50) {
	}
	else if (avg >= 50 && avg <= 70) {
		if (avg >= 60 && avg <= 75) {

		}
	}
	else if (avg > 70) {

	}
	if (weatherStatus === "rain" || weatherStatus === "snow") {
	}
	else if (avg > 70) {

	}
	else {

	}
}

function organizeCatagories(arrClothings) {
	//initialize empty arrays for categories
	coats = []
	sweaters = []
	hoodies = []
	jackets = []
	long_sleeve = []
	short_sleeve = []
	sleeveless = []
	pants = []
	shorts = []
	open_toed = []
	closed_toed = []
	boots = []
	dresses = []

	//iterate through array of clothing, and sort the items into respective arrays
	for (let i = 0; i < arrClothings.length; i++) {
		if (arrClothings[i].get('category') == 'Coats') {
			coats.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Jacket') {
			jackets.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Sweater') {
			sweaters.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Hoodie') {
			hoodies.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Long Sleeve T-shirt') {
			long_sleeve.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Short Sleeve T-shirt') {
			short_sleeve.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Sleeveless shirt') {
			sleeveless.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Pants') {
			pants.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Shorts / Skirt') {
			shorts.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Open Toed Shoes') {
			open_toed.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Close Toed Shoes') {
			closed_toed.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Rain Boots') {
			boots.push(arrClothings[i])
		}
		else if (arrClothings[i].get('category') == 'Dress') {
			dresses.push(arrClothings[i])
		}
	}

	let clothing_sort = {
		'coats': coats, 'sweaters': sweaters, 'jackets': jackets, 'hoodies': hoodies, 'long_sleeve': long_sleeve,
		'short_sleeve': short_sleeve, 'sleeveless': sleeveless, 'pants': pants,
		'shorts': shorts, 'open_toed': open_toed, 'closed_toed': closed_toed,
		'boots': boots, 'dresses': dresses
	}

	return clothing_sort
}

module.exports = { getCurrentWeather, serveResults };
