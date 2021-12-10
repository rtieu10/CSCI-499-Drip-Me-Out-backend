const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"


async function getClosetItems(data, res){
  let userCloset = [];
  const ClothingItem = Parse.Object.extend("ClothingItem");
  const query = new Parse.Query(ClothingItem);
  query.equalTo("email", data["email"]);
  try{
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      const info = JSON.stringify({
           "id" : object.id,
           "label": object.get("name"),
           "image": object.get("imagedata"),
           "category": object.get("category")
      });
      userCloset.push(info);
    }
    const result = JSON.stringify({"closet":userCloset});
    res.end(result);
  }catch (error) {
		console.log("Error: " + error.code + " " + error.message);
		res.write("error");
		res.end();
	}
}

async function filterItems(data, res){
  let userCloset = [];
  const ClothingItem = Parse.Object.extend("ClothingItem");
  const query = new Parse.Query(ClothingItem);
  query.equalTo("email", data["user"]);
  try{
    const results = await query.find();
    let categoryFilter = []
    if(data["category_checkbox"] == true){
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if(object.get("category") == data["category_value"]){
          categoryFilter.push(object);
        }
      }
    } else{
      categoryFilter = results;
    }
    colorFilter = []
    if(data["colors_checkbox"] == true) {
      for (let i = 0; i < categoryFilter.length; i++) {
        const object = categoryFilter[i];
        if(object.get("color") == data["colors_value"]){
          colorFilter.push(object);
        }
      }
    } else{
      colorFilter = categoryFilter;
    }
    for (let i = 0; i < colorFilter.length; i++) {
      const object = colorFilter[i];
      console.log(object.get("name"));
      const info = JSON.stringify({
           "id" : object.id,
           "label": object.get("name"),
           "image": object.get("imagedata"),
           "category": object.get("category")
      });
      userCloset.push(info);
    }
    const result = JSON.stringify({"closet":userCloset});
    res.end(result);
  }catch (error) {
		console.log("Error: " + error.code + " " + error.message);
		res.write("error");
		res.end();
	}
}


module.exports = { getClosetItems, filterItems};
