const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

async function generateOutfit(data, res) {
  const arrClothings = await fetchParse(data["user"]);
  const clothing_sort = organizeCategories(arrClothings);
  const outfit = pickOutfit(data, clothing_sort);
  const result = JSON.stringify({"outfit":outfit});
  res.end(result)
  console.log(result);

}


//@func: function fetches the all the users clohing items stored in the Parse database
//@user: a string containing user email (ex: rachel@test.com)
//@return: the function returns an array containing all the clothing items the user has uploaded
async function fetchParse(user) {
  //use parse query to get the users email
  //pull in the users database of clothing that they have uploaded
  //save the clothing items that the user has uploaded as an array

  //connecting to ClothingItem table in parse
  const ClothingItem = Parse.Object.extend("ClothingItem");
  //querying the ClothingItem table
  const query = new Parse.Query(ClothingItem);
  //check if the email column of the table equals to the user's email
  query.equalTo("email", user);
  try {
    //waits for the results array to be populated with the data that meets the conditions
    const results = await query.find();
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.get('name'));
    }
    return results
  } catch (error) {
		console.log("Error: " + error.code + " " + error.message);
  }
  //return results array that stores all of the rows that met query condition
}


//@func: function iterates through the array of users clothing and organizes it by category
//@arrClothings: an array that contains all the clothing the user uploaded
function organizeCategories(arrClothings) {
  //initialize empty arrays for categories
  coat = [];
  jacket = [];
  parka = [];
  raincoat = [];
  minidress = [];
  mididress = [];
  maxidress = [];
  hoodie = [];
  sweatshirt = [];
  jumpsuit = [];
  romper = [];
  cargo_pants = [];
  jeans = [];
  pants = [];
  sweatpants = [];
  boots = [];
  dress_shoes = [];
  flat_shoes = [];
  heels = [];
  sandals = [];
  slides_flipflops = [];
  sneakers = [];
  shorts = [];
  miniskirt = [];
  midiskirt = [];
  maxiskirt = [];
  cardigan = [];
  sweater = [];
  tank_top = [];
  crop_top = [];
  blouse = [];
  bodysuit = [];
  buttonup_shirt = [];
  long_sleeve = [];
  short_sleeve = [];

  //iterate through array of clothing, and sort the items into respective arrays
  for(let i = 0; i < arrClothings.length; i++) {
    if(arrClothings[i].get('subcategory') == 'Coat') {
      pushItem(arrClothings[i], coat);
    }
    else if(arrClothings[i].get('subcategory') == 'Jacket') {
      pushItem(arrClothings[i], jacket);
    }
    else if(arrClothings[i].get('subcategory') == 'Parka') {
      pushItem(arrClothings[i], parka);
    }
    else if(arrClothings[i].get('subcategory') == 'Raincoat') {
      pushItem(arrClothings[i], raincoat);
    }
    else if(arrClothings[i].get('subcategory') == 'Minidress') {
      pushItem(arrClothings[i], minidress);
    }
    else if(arrClothings[i].get('subcategory') == 'Mididress') {
      pushItem(arrClothings[i], mididress);
    }
    else if(arrClothings[i].get('subcategory') == 'Maxidress') {
      pushItem(arrClothings[i], maxidress);
    }
    else if(arrClothings[i].get('subcategory') == 'Hoodie') {
      pushItem(arrClothings[i], hoodie);
    }
    else if(arrClothings[i].get('subcategory') == 'Sweatshirt') {
      pushItem(arrClothings[i], sweatshirt);
    }
    else if(arrClothings[i].get('subcategory') == 'Jumpsuit') {
      pushItem(arrClothings[i], jumpsuit);
    }
    else if(arrClothings[i].get('subcategory') == 'Romper') {
      pushItem(arrClothings[i], romper);
    }
    else if(arrClothings[i].get('subcategory') == 'Cargo Pants') {
      pushItem(arrClothings[i], cargo_pants);
    }
    else if(arrClothings[i].get('subcategory') == 'Jeans') {
      pushItem(arrClothings[i], jeans);
    }
    else if(arrClothings[i].get('subcategory') == 'Pants') {
      pushItem(arrClothings[i], pants);
    }
    else if(arrClothings[i].get('subcategory') == 'Sweatpants') {
      pushItem(arrClothings[i], sweatpants);
    }
    else if(arrClothings[i].get('subcategory') == 'Boots') {
      pushItem(arrClothings[i], boots);
    }
    else if(arrClothings[i].get('subcategory') == 'Dress Shoes') {
      pushItem(arrClothings[i], dress_shoes);
    }
    else if(arrClothings[i].get('subcategory') == 'Flat Shoes') {
      pushItem(arrClothings[i], flat_shoes);
    }
    else if(arrClothings[i].get('subcategory') == 'Heels') {
      pushItem(arrClothings[i], heels);
    }
    else if(arrClothings[i].get('subcategory') == 'Sandals') {
      pushItem(arrClothings[i], sandals);
    }
    else if(arrClothings[i].get('subcategory') == 'Slides & Flip flops') {
      pushItem(arrClothings[i], slides_flipflops);
    }
    else if(arrClothings[i].get('subcategory') == 'Sneakers') {
      pushItem(arrClothings[i], sneakers);
    }
    else if(arrClothings[i].get('subcategory') == 'Shorts') {
      pushItem(arrClothings[i], shorts);
    }
    else if(arrClothings[i].get('subcategory') == 'Miniskirt') {
      pushItem(arrClothings[i], miniskirt);
    }
    else if(arrClothings[i].get('subcategory') == 'Midiskirt') {
      pushItem(arrClothings[i], midiskirt);
    }
    else if(arrClothings[i].get('subcategory') == 'Maxiskirt') {
      pushItem(arrClothings[i], maxiskirt);
    }
    else if(arrClothings[i].get('subcategory') == 'Cardigan') {
      pushItem(arrClothings[i], cardigan);
    }
    else if(arrClothings[i].get('subcategory') == 'Sweater') {
      pushItem(arrClothings[i], sweater);
    }
    else if(arrClothings[i].get('subcategory') == 'Tank top') {
      pushItem(arrClothings[i], tank_top);
    }
    else if(arrClothings[i].get('subcategory') == 'Crop top') {
      pushItem(arrClothings[i], crop_top);
    }
    else if(arrClothings[i].get('subcategory') == 'Blouse') {
      pushItem(arrClothings[i], blouse);
    }
    else if(arrClothings[i].get('subcategory') == 'Bodysuit') {
      pushItem(arrClothings[i], bodysuit);
    }
    else if(arrClothings[i].get('subcategory') == 'Button-up shirt') {
      pushItem(arrClothings[i], buttonup_shirt);
    }
    else if(arrClothings[i].get('subcategory') == 'Long-sleeve t-shirt') {
      pushItem(arrClothings[i], long_sleeve);
    }
    else if(arrClothings[i].get('subcategory') == 'Short-sleeve t-shirt') {
      pushItem(arrClothings[i], short_sleeve);
    }
  }

  //create dictionary to return where key is clothing type, and array stores the image of the item
  //key: item type, value: array of clothing that matches the item type
  const clothing_sort = {'coat': coat, 'jacket': jacket, 'parka': parka,
  'raincoat': raincoat, 'minidress': minidress, 'mididress': mididress,
  'maxidress': maxidress, 'hoodie': hoodie, 'sweatshirt': sweatshirt,
  'jumpsuit': jumpsuit, 'romper': romper, 'cargo_pants': cargo_pants,
  'jeans': jeans, 'pants': pants, 'sweatpants': sweatpants, 'boots': boots,
  'dress_shoes': dress_shoes, 'flat_shoes': flat_shoes, 'heels': heels,
  'sandals': sandals, 'slides_flipflops': slides_flipflops,
  'sneakers': sneakers, 'shorts': shorts, 'miniskirt': miniskirt,
  'midiskirt': midiskirt, 'maxiskirt': maxiskirt, 'cardigan': cardigan,
  'sweater': sweater, 'tank_top': tank_top, 'crop_top': crop_top,
  'blouse': blouse, 'bodysuit': bodysuit, 'buttonup_shirt': buttonup_shirt,
  'long_sleeve': long_sleeve, 'short_sleeve': short_sleeve};

  return clothing_sort
}

function pushItem(item, arr) {
  const info = {
    "name": item.get("name"),
    "category": item.get("category"),
    "id": item.id,
    "email": item.get("email"),
    "image": item.get("imagedata")
  };
  console.log(info);
  arr.push(info);
}

//runs the function for each individual category based on the weather
//fills in result array of the randomly generated outfit
function pickOutfit(data, clothing_sort) {
  console.log(clothing_sort["short_sleeve"]);
  const temp = data["temp"];
  const condition = data["condition"];
  result = [];
  const rand = Math.floor(Math.random() * 10); //random var for long sleeves
  const rand1 = Math.floor(Math.random() * 10); // random var for sleevless
  const rand2 = Math.floor(Math.random() * 10); //rand var for closed toed shoes
  const rand3 = Math.floor(Math.random() * 10); //rand var for dress


  // Dress or Jumpsuit or Romper
  if(rand3 <= 3 && temp >= 46) {
    if(temp >= 46 && temp < 65) {
      pickRandomItem(clothing_sort["maxidress"] + clothing_sort["jumpsuit"], clothing_sort, result);
    }
    if else(temp >= 65 && temp < 80) {
      pickRandomItem(clothing_sort["maxidress"] + clothing_sort["mididress"] + clothing_sort["jumpsuit"], clothing_sort, result);
    }
    if else(temp >= 80) {
      pickRandomItem(clothing_sort["minidress"] + clothing_sort["romper"], clothing_sort, result);
    }
  }
  else {
    // Top
    if(temp < 45 && condition == "rain" && !(empty(clothing_sort["raincoat"]))) {
      pickRandomItem(clothing_sort["raincoat"], clothing_sort, result);
      pickRandomItem(
        clothing_sort["hoodie"] + clothing_sort["sweatshirt"] + clothing_sort["cardigan"] + clothing_sort["sweater"],
        clothing_sort, result);
      pickRandomItem(
        clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
        clothing_sort, result);
    }
    else if(temp >= 45 && condition == "rain" && !(empty(clothing_sort["raincoat"]))) {
      pickRandomItem(clothing_sort["raincoat"], clothing_sort, result);
      pickRandomItem(
        clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
        clothing_sort, result);
    }
    else if(temp < 25 && (!(empty(clothing_sort["coat"])) || !(empty(clothing_sort["jacket"])) || !(empty(clothing_sort["parka"])))) {
      pickRandomItem(
        clothing_sort["coat"] + clothing_sort["jacket"] + clothing_sort["parka"],
        clothing_sort, result);
      pickRandomItem(
        clothing_sort["hoodie"] + clothing_sort["sweatshirt"] + clothing_sort["cardigan"] + clothing_sort["sweater"],
        clothing_sort, result);
      pickRandomItem(
        clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
        clothing_sort, result);
    }
    else if(temp < 45 && (!(empty(clothing_sort["coat"])) || !(empty(clothing_sort["jacket"])) || !(empty(clothing_sort["parka"])))) {
      pickRandomItem(
        clothing_sort["coat"] + clothing_sort["jacket"] + clothing_sort["parka"],
        clothing_sort, result);
        pickRandomItem(
          clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
          clothing_sort, result);
    }
    else if((temp < 65 && (!(empty(clothing_sort["hoodie"])) || !(empty(clothing_sort["sweatshirt"])) || !(empty(clothing_sort["cardigan"])) || !(empty(clothing_sort["sweater"])))) {
      pickRandomItem(
        clothing_sort["hoodie"] + clothing_sort["sweatshirt"] + clothing_sort["cardigan"] + clothing_sort["sweater"],
        clothing_sort, result);
      pickRandomItem(
        clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
        clothing_sort, result);
    }
    else {
      pickRandomItem(
        clothing_sort["tank_top"] + clothing_sort["crop_top"] + clothing_sort["blouse"] + clothing_sort["bodysuit"] + clothing_sort["buttonup_shirt"] + clothing_sort["long_sleeve"] + clothing_sort["short_sleeve"],
        clothing_sort, result);
    }

    // Bottom
    if (temp >= 80 && !(empty(clothing_sort["shorts"]))) {
      pickRandomItem(clothing_sort["shorts"] + clothing_sort["miniskirt"], clothing_sort, result);
    }
    else {
      pickRandomItem(
        clothing_sort["cargo_pants"] + clothing_sort["jeans"] + clothing_sort["pants"] + clothing_sort["sweatpants"] + clothing_sort["midiskirt"] + clothing_sort["maxiskirt"],
        clothing_sort, result);
    }
  }

  // Shoes
  if (condition == "rain" && !(empty(clothing_sort["boots"]))) {
    pickRandomItem(clothing_sort["boots"], clothing_sort, result);
  }
  else if(temp >= 80 && rand2 > 5 && (!(empty(clothing_sort["sandals"])) || !(empty(clothing_sort["slides_flipflops"])))) {
    pickRandomItem(
      clothing_sort["sandals"] + clothing_sort["slides_flipflops"],
      clothing_sort, result);
  }
  else{
    pickRandomItem(
      clothing_sort["boots"] + clothing_sort["dress_shoes"] + clothing_sort["flat_shoes"] + clothing_sort["heels"] + clothing_sort["sneakers"],
      clothing_sort, result);
  }

  return result;
}

//pass through the category to pick random item that complies with the users filters
function pickRandomItem(subcategory, clothing_sort, arr) {
  const index = Math.floor(Math.random() * subcategory.length);
  if (subcategory.length != []) {
    arr.push(subcategory[index]);
  }
  // pass dict as param
  // if category name matches key in dict, then choose random elem from the
  // array stored as a value
}

function empty(arr) {
  return arr == [];
}
module.exports = { generateOutfit };
