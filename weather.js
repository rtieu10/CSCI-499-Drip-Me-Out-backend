const http = require('http');
const https = require('https');

const { api_key } = require('./credential.json');

//Retrieves data from weather api
function get_current_weather(zipcode, res){
	let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api_key}`;
	https.request(`${endpoint}`, {method:"GET"}, process_stream).end();
	function process_stream(weather_stream){
		let weather_data;
		weather_stream.on("data", api_data => weather_data = api_data);
		weather_stream.on("end", () => {
      console.log(JSON.parse(weather_data));
			serve_results(weather_data, res);
		});
	}
}

//Formats data to send back response
function serve_results(weather_data, res){
	weather = JSON.parse(weather_data);
	let low = ((weather.main.temp_min - 273.15) * 9) / 5 + 32;
	let high = ((weather.main.temp_max - 273.15) * 9) / 5 + 32;
	let weather_status = weather.weather[0].main.toLowerCase();
	low = Math.round(low);
	high = Math.round(high);
	let data = JSON.stringify({
    "status": weather_status,
    "high": high,
    "low":low
  });
	res.end(data);
}

module.exports = { get_current_weather, serve_results };
