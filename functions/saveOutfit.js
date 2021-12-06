const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

async function saveOutfit(data, res) {
  let item = new Parse.Object("Outfit");
  item.set("name", data["name"]);
  item.set("clothingList", data["outfit"]);
  item.set("email", data["user"]);
  item.save();
  if(checkDuplicate(data, res)){
    res.write("duplicate");
    res.end();
    return;
  }
  res.write("saved");
  res.end();
}
async function checkDuplicate(data, res) {
  const Outfit = Parse.Object.extend("Outfit");
  query.equalTo("email", user);
  try{
    //waits for the results array to be populated with the data that meets the conditions
    const results = await query.find();
    for (let i = 0; i < results.length; i++){
      const object = results[i];
      if(object.get("name") == data["name"]{
        return true;
      }
    }
    return true;
  } catch (error) {
		console.log("Error: " + error.code + " " + error.message);
  }
}



module.exports = { saveOutfit };
