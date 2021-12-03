const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

async function getItemsById(data, res) {
  let userView = [];
  const ClothingItem = Parse.Object.extend("ClothingItem");
  const query = new Parse.Query(ClothingItem);
  query.equalTo("email", data["email"]);
  try {
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (object.id === data["toplayer"]) {
        const info = JSON.stringify({
          id: object.id,
          label: object.get("name"),
          image: object.get("imagedata"),
          category: object.get("category"),
          color: object.get("color"),
          layer: "top",
        });
        userView.push(info);
      } else if (object.id === data["bottomlayer"]) {
        const info = JSON.stringify({
          id: object.id,
          label: object.get("name"),
          image: object.get("imagedata"),
          category: object.get("category"),
          color: object.get("color"),
          layer: "bottom",
        });
        userView.push(info);
      } else if (object.id === data["shoelayer"]) {
        const info = JSON.stringify({
          id: object.id,
          label: object.get("name"),
          image: object.get("imagedata"),
          category: object.get("category"),
          color: object.get("color"),
          layer: "shoe",
        });
        userView.push(info);
      }
    }
    const result = JSON.stringify({ view: userView });
    res.end(result);
  } catch (error) {
    console.log("Error: " + error.code + " " + error.message);
    res.write("error");
    res.end();
  }
}

module.exports = { getItemsById };
