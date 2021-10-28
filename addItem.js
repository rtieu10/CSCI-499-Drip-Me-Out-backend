const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

let image = '';

function addImage(data, res){
  image = data.substr("data:image/jpeg;base64,".length, data.length - "data:image/jpeg;base64,".length);
  console.log("image saved");
  res.write("added");
  res.end();
}

async function addItem(data, res){
  duplicate = await checkDuplicate(data, res)
  console.log(`duplicate = ${duplicate}`);
  if(!(duplicate)){
    let item = new Parse.Object("ClothingItem");
    item.set("name", data["label"]);
    item.set("imagedata", image);
    item.set("category", data["label"]);
    item.set("type", data["type"]);
    item.set("color", data["color"]);
    item.set("email", data["email"]);
    item.save();
    res.write("added");
		res.end();
  }
}

async function checkDuplicate(data, res) {
  const ClothingItem = Parse.Object.extend("ClothingItem");
  const query = new Parse.Query(ClothingItem);
  query.equalTo("email", data["email"]);
  try{
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if(object.get("name") === data["label"] && image === object.get("imagedata")){
        res.write("recorded");
        res.end();
        return true;
      }
    }
  } catch (error) {
		console.log("Error: " + error.code + " " + error.message);
		res.write("recorded");
		res.end();
    return true;
	}
  return false;
}

module.exports = { addImage, addItem };
