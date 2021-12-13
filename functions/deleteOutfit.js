const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

async function deleteOutfit(data, res){
    const Outfit = Parse.Object.extend("Outfit");
    const query = new Parse.Query(Outfit);
    query.get(data.id).then((ClothingItem) => {
      Outfit.destroy().then((object)=> {
        console.log("Outfit was removed");
      })
      res.write("removed");
      res.end();
    }, (error) => {
      console.log("Error: " + error.code + " " + error.message);
      res.write("error");
      res.end();
      return true;
    });
    return false;
}

module.exports = { deleteOutfit };
