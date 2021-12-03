const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"


async function getOutfits(data, res){
  let userOutfits = [];
  const Outfit = Parse.Object.extend("Outfit");
  const query = new Parse.Query(Outfit);
  query.equalTo("email", data["email"]);
  try{
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      const info = JSON.stringify({
           "id" : object.id,
           "name": object.get("name"),
      });
      userOutfits.push(info);
    }
    const result = JSON.stringify({"outfits":userOutfits});
    console.log(result);
    res.end(result);
  }catch (error) {
		console.log("Error: " + error.code + " " + error.message);
		res.write("error");
		res.end();
	}
}

async function outfitLookUp(data, res){
  let resultOutfit = [];
  const Outfit = Parse.Object.extend("Outfit");
  const query = new Parse.Query(Outfit);
  query.get(data["id"]);
  .then( (outfit) => {
    clothingItems = outfit.get(clothingList);
    for (var i = 0; i < outfit.length; i++) {
      const ClothingItem = Parse.Object.extend("ClothingItem");
      const query = new Parse.Query(ClothingItem);
      query.get(outfit[i]);
      .then( (clothingItem) => {
        pushItem(clothingItem, resultOutfit);
      }, (error) => {
        console.log(error)
      });
    }
  }, (error) => {
    console.log(error)
  });
  console.log(resultOutfit);
}

function pushItem(item, arr){
  const info = {
    "name": item.get("name"),
    "category": item.get("category"),
    "id": item.id,
    "email": item.get("email"),
    //"image": item.get("imagedata")
  };
  // console.log(info);
  arr.push(info);
}


module.exports = { getOutfits , outfitLookUp};
