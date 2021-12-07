const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

async function editItem(data, res) {
  let image = "";
  console.log(data["image"]?.substr(11, 4));
  console.log(data["image"]?.substr(11, 3));
  if (data["image"]?.substr(11, 4) === "jpeg") {
    image = data["image"].substr(
      "data:image/jpeg;base64,".length,
      data["image"].length - "data:image/jpeg;base64,".length
    );
    console.log(image + "hello");
  }
  if (data["image"]?.substr(11, 3) === "png") {
    image = data["image"].substr(
      "data:image/png;base64,".length,
      data["image"].length - "data:image/png;base64,".length
    );
    console.log(image + "hello");
  }
  duplicate = await checkDuplicate(data, image, res);
  console.log(`duplicate = ${duplicate}`);
  if (!duplicate) {
    const ClothingItem = Parse.Object.extend("ClothingItem");
    const query = new Parse.Query(ClothingItem);
    query.equalTo("email", data["email"]);
    try {
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if (object.id === data["id"]) {
          object.set("name", data["label"]);
          object.set("imagedata", image);
          object.set("category", data["category"]);
          object.set("color", data["color"]);
          object.set("email", data["email"]);
          object.save();
          res.write("edited");
          res.end();
          return true;
        }
      }
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message);
      res.write("error");
      res.end();
      return true;
    }
    return false;
  }
}

async function checkDuplicate(data, image, res) {
  const ClothingItem = Parse.Object.extend("ClothingItem");
  const query = new Parse.Query(ClothingItem);
  query.equalTo("email", data["email"]);
  try {
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (
        object.get("name") === data["label"] &&
        object.get("category") === data["category"] &&
        object.get("color") === data["color"] &&
        image === object.get("imagedata")
      ) {
        res.write("recorded");
        res.end();
        return true;
      }
    }
  } catch (error) {
    console.log("Error: " + error.code + " " + error.message);
    res.write("error");
    res.end();
    return true;
  }
  return false;
}

module.exports = { editItem };
