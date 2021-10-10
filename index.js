const https = require('https');
// const path = require('path');
const Parse = require('parse/node');
const http = require('http');
const fs = require('fs');

const { api_key } = require('./credential.json');

Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

let zipcode = "";

const server = http.createServer();

server.on("listening", () => {});

server.on("request", function(req, res) {
   if (req.method === "POST")
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
});

server.listen(8080);

function base64_encode(file)
{
   const bitmap = fs.readFileSync(file);
   return new Buffer(bitmap).toString('base64');
}

function add_clothing_item(image_path, name, category, type, color)
{
   let imagedata = base64_encode(image_path);
   let image_to_db = new Parse.Object("ClothingItem");
   image_to_db.set("name", name);
   image_to_db.set("imagedata", imagedata);
   image_to_db.set("category", category);
   image_to_db.set("type", type);
   image_to_db.set("color", color);
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
