const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

async function saveOutfit(data, res){
  let item = new Parse.Object("Outfit");
  item.set("name",data["name"]);
  item.set("clothingList",data["outfit"]);
  item.set("email",data["user"]);
  item.save();
  res.end();
}
async function checkDuplicate(data, res) {
}



module.exports = { saveOutfit };
