const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

function generateOutfit(data, res){
  fetchParse();
  organizeCatagories();
  pickClothing();
  return result

}


//@func: function fetches the all the users clohing items stored in the Parse database
//@user: a string containing user email (ex: rachel@test.com)
//@return: the function returns an array containing all the clothing items the user has uploaded
async function fetchParse(user){
  //use parse query to get the users email
  //pull in the users database of clothing that they have uploaded
  //save the clothing items that the user has uploaded as an array

  //connecting to ClothingItem table in parse
  const ClothingItem = Parse.Object.extend("ClothingItem");
  //querying the ClothingItem table
  const query = new Parse.Query(ClothingItem);
  //check if the email column of the table equals to the user's email
  query.equalTo("email", user)
  //waits for the results array to be populated with the data that meets the conditions
  const results = await query.find()
  //alert that the request was successful
  alert("Successfully retrieved " + results.length + "items of clothing.")
  //return results array that stores all of the rows that met query condition
  return results

}


//@func: function iterates through the array of users clothing and organizes it by category
//@arrClothings: an array that contains all the clothing the user uploaded
function organizeCatagories(arrClothings){
  //initialize empty arrays for categories
  coats = []
  sweaters = []
  long_sleeve = []
  short_sleeve = []
  sleeveless = []
  pants = []
  shorts = []
  open_toed = []
  closed_toed = []
  boots = []
  dresses = []

  //iterate through array of clothing, and sort the items into respective arrays
  for(let i = 0; i < arrClothings.length; i++){
    if(arrClothings[i].get('type') == 'Coats'){
      coats.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Hoodies/Sweaters/Jackets'){
      sweaters.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Long Sleeve T-shirt'){
      long_sleeve.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Short Sleeve T-shirt'){
      short_sleeve.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Sleeveless shirt'){
      sleeveless.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Pants'){
      pants.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Shorts / Skirt'){
      shorts.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Open toed shoes'){
      open_toed.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Closed toed shoes'){
      closed_toed.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Rain Boots'){
      boots.push(arrClothings[i])
    }
    else if(arrClothings[i].get('type') == 'Dress'){
      dresses.push(arrClothings[i])
    }
  }

  //create dictionary to return where key is clothing type, and array stores the image of the item
  //key: item type, value: array of clothing that matches the item type
  var clothing_sort = {'coats': coats, 'sweaters': sweaters, 'long_sleeve': long_sleeve,
                      'short_sleeve': short_sleeve, 'sleeveless': sleeveless, 'pants': pants,
                      'shorts': shorts, 'open_toed': open_toed, 'closed_toed': closed_toed,
                      'boots': boots, 'dresses': dresses}

  return clothing_sort
}

//runs the function for each individual catagory based on the weather
//fills in result array of the randomly generated outfit
function pickClothing(){
  //result array []
  //if hot
    pickFilteredItem("shorts");
  //  run shorts
  //  run tshirt
  //else if cold
  //  run pants
  //
  //  (run tshirt and run jacket)  or (run sweater)
}

//pass through the catagory to pick random item that complies with the users filters
function pickFilteredItem(category){
  // pass dict as param
  // if category name matches key in dict, then choose random elem from the
  // array stored as a value
}

module.exports = { generateOutfit };
