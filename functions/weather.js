const http = require("http");
const https = require("https");

const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const { apiKey } = require("../credential.json");

//Retrieves data from weather api
function getCurrentWeather(zipCode, res, email, isCelsius) {
  // email
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  https.request(`${endpoint}`, { method: "GET" }, processStream).end();
  function processStream(weatherStream) {
    let weatherData;
    weatherStream.on("data", (apiData) => (weatherData = apiData));
    weatherStream.on("end", () => {
      console.log(JSON.parse(weatherData));
      serveResults(weatherData, res, email, isCelsius); //email
    });
  }
}

//Formats data to send back response
function serveResults(weatherData, res, email, isCelsius) {
  // email
  const weather = JSON.parse(weatherData);
  console.log(JSON.stringify(weather, null, 2));
  if (weather["cod"] === "404") {
    res.end("404 city not found");
    return;
  }
  if (weather["cod"] === "400") {
    res.end("400 Nothing to geocode. Try changing zipcode under profile.");
    return;
  }
  let low = ((weather.main.temp_min - 273.15) * 9) / 5 + 32;
  let high = ((weather.main.temp_max - 273.15) * 9) / 5 + 32;
  let weatherStatus = weather.weather[0].main.toLowerCase();
  low = Math.round(low);
  high = Math.round(high);
  if (isCelsius == "true"){
    low = toCelsius(low);
    high = toCelsius(high);
  }

  let data = JSON.stringify({
    status: weatherStatus,
    high: high,
    low: low,
  });
  res.end(data);
}

function toCelsius(f){
  num = (f - 32) * 5;
  return num / 5;
}

module.exports = { getCurrentWeather };
