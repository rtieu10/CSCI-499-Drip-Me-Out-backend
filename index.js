const https = require("https");
// const path = require('path');
const Parse = require("parse/node");
const http = require("http");
const fs = require("fs");
const url = require("url");
const { parseUserSignup, parseUserLogin } = require("./functions/user.js");
const { getCurrentWeather } = require("./functions/weather.js");
const { addItem } = require("./functions/addItem.js");
const { getClosetItems, filterItems } = require("./functions/closet.js");
const { generateOutfit } = require("./functions/generateOutfit.js");
const { viewItem } = require("./functions/viewItem.js");
const { editItem } = require("./functions/editItem.js");
const { removeItem } = require("./functions/removeItem.js");
const { saveOutfit } = require("./functions/saveOutfit.js");
const { getOutfits, outfitLookUp } = require("./functions/getOutfits.js");
const { deleteOutfit } = require("./functions/deleteOutfit.js");
const { getItemsById } = require("./functions/getItemsById.js");
const { editProfile } = require("./functions/editProfile.js");

Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

let zipcode = "";

const server = http.createServer();

server.on("listening", () => {});

//request requires JSON   { "zipcode":int }
//response outputs JSON   { "status":string, "high":int, "low":int } */
server.on("request", function (req, res) {
  if (req.method === "POST" && req.url.startsWith("/zipcode")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });

    req.on("end", function () {
      // When the data buffers end or there's no more data buffers to be appended
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      getCurrentWeather(body["zipcode"], res, body["email"], body["isCelsius"]); //body['email']
    });
  } else if (req.method === "POST" && req.url.startsWith("/closet")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });

    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      getClosetItems(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/filterCloset")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });

    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      filterItems(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/additem")) {
    let body;

    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });

    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      addItem(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/signup")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      parseUserSignup(
        body["username"],
        body["email"],
        body["password"],
        body["zipcode"],
        res
      );
    });
  } else if (req.method === "POST" && req.url.startsWith("/login")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      parseUserLogin(body["email"], body["password"], res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/generate")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      generateOutfit(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/view")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      viewItem(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/editItem")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      editItem(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/remove")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      removeItem(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/saveOutfit")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      saveOutfit(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/getOutfits")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      getOutfits(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/outfitLookUp")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      outfitLookUp(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/deleteOutfit")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      deleteOutfit(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/getItemsById")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      console.log(body);
      getItemsById(body, res);
    });
  } else if (req.method === "POST" && req.url.startsWith("/editProfile")) {
    let body;
    req.on("data", function (data) {
      body += data;
      // undefined is part of the data buffer, so we delete that section
      if (body.substr(0, 9) == "undefined") {
        body = body.substr(9, body.length - 9);
      }
    });
    req.on("end", function () {
      body = JSON.parse(body.toString("utf8"));
      editProfile(body, res);
    });
  }
});

server.listen(8080);
