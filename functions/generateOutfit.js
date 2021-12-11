const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

async function generateOutfit(data, res) {
  const arrClothings = await fetchParse(data["user"]);
  const clothing_sort = organizeCategories(data, arrClothings);
  const outfit = pickOutfit(data, clothing_sort);
  const result = JSON.stringify({"outfit":outfit});
  res.end(result)
  // console.log(result);
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
function organizeCategories(data, arrClothings) {
  //initialize empty arrays for categories
  coats = [];
  sweaters = [];
  long_sleeve = [];
  short_sleeve = [];
  sleeveless = [];
  pants = [];
  shorts = [];
  open_toed = [];
  closed_toed = [];
  boots = [];
  dresses = [];
  accessories = [];

  //iterate through array of clothing, and sort the items into respective arrays
  for(let i = 0; i < arrClothings.length; i++) {
    if(arrClothings[i].get('type') == 'Coats') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], coats);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], coats);
      }
    }
    else if(arrClothings[i].get('category') == 'Hoodies/Sweaters/Jackets') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], sweaters);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], sweaters);
      }
    }
    else if(arrClothings[i].get('category') == 'Long Sleeve T-shirt') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], long_sleeve);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], long_sleeve);
      }
    }
    else if(arrClothings[i].get('category') == 'Short Sleeve T-shirt') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], short_sleeve);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], short_sleeve);
      }
    }
    else if(arrClothings[i].get('category') == 'Sleeveless Top') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], sleeveless);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], sleeveless);
      }
    }
    else if(arrClothings[i].get('category') == 'Pants') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], pants);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], pants);
      }
    }
    else if(arrClothings[i].get('category') == 'Shorts/Skirt') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], shorts);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], shorts);
      }
    }
    else if(arrClothings[i].get('category') == 'Open Toed Shoes') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], open_toed);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], open_toed);
      }
    }
    else if(arrClothings[i].get('category') == 'Close Toed Shoes') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], closed_toed);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], closed_toed);
      }
    }
    else if(arrClothings[i].get('category') == 'Rain Boots') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], boots);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], boots);
      }
    }
    else if(arrClothings[i].get('category') == 'Dress') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], dresses);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], dresses);
      }
    }
    else if(arrClothings[i].get('category') == 'Accessories') {
      if(data["color_checkbox"] && arrClothings[i].get('color') == data["color_value"]){
        pushItem(arrClothings[i], accessories);
      }
      else if(!(data["color_checkbox"])){
        pushItem(arrClothings[i], accessories);
      }
    }
  }

  //create dictionary to return where key is clothing type, and array stores the image of the item
  //key: item type, value: array of clothing that matches the item type
  const clothing_sort = {'coats': coats, 'sweaters': sweaters,
  'long_sleeve': long_sleeve, 'short_sleeve': short_sleeve,
  'sleeveless': sleeveless, 'pants': pants, 'shorts': shorts,
  'open_toed': open_toed, 'closed_toed': closed_toed, 'boots': boots,
  'dresses': dresses, 'accessories': accessories};

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
  // console.log(info);
  arr.push(info);
}

//runs the function for each individual category based on the weather
//fills in result array of the randomly generated outfit
function pickOutfit(data, clothing_sort) {
  if(data["temp_checkbox"]){
    return outfitTempreture(data, clothing_sort);
  }
  else{
    return outfitNonTempreture(data, clothing_sort)
  }
}

function outfitNonTempreture(data, clothing_sort){
  const condition = data["weather_value"];
  result = [];
  const rand = Math.floor(Math.random() * 10);
  const rand1 = Math.floor(Math.random() * 10);
  const rand2 = Math.floor(Math.random() * 10);
  const rand3 = Math.floor(Math.random() * 10);
  const rand4 = Math.floor(Math.random() * 10);
  const rand5 = Math.floor(Math.random() * 10);
  const rand6 = Math.floor(Math.random() * 10);
  const rand7 = Math.floor(Math.random() * 10);

  //Dress
  if (rand < 3){
    pickRandomItem("dresses", clothing_sort, result);
  }
  else{
    //Top
    if (rand1 < 3){
      pickRandomItem("coats", clothing_sort, result);
      pickRandomItem("sweaters", clothing_sort, result);
      pickRandomItem("short_sleeve", clothing_sort, result);
    }
    else if (rand1 < 7){
      pickRandomItem("coats", clothing_sort, result);
      pickRandomItem("short_sleeve", clothing_sort, result);
    }
    else{
      if(rand2 <= 3){
        pickRandomItem("long_sleeve", clothing_sort, result);
      }
      else if (rand2 < 8){
        pickRandomItem("short_sleeve", clothing_sort, result);
      }
      else {
        pickRandomItem("sleeveless", clothing_sort, result);
      }
    }

    //Bottom
    if(rand3 < 6){
      pickRandomItem("shorts", clothing_sort, result);
    }
    else{
      pickRandomItem("pants", clothing_sort, result);
    }
  }

  if ((condition == "rain" || condition == "snow") && !(empty(clothing_sort["boots"])) && data["weather_checkbox"]) {
    pickRandomItem("boots", clothing_sort, result);
  }
  else if (rand4 < 7){
    pickRandomItem("closed_toed", clothing_sort, result);
  }
  else {
    pickRandomItem("open_toed", clothing_sort, result);
  }

  if(data["accessories_checkbox"]){
    pickRandomItem("accessories", clothing_sort, result);
  }

  return result;
}

function outfitTempreture(data, clothing_sort){
  // console.log(clothing_sort["short_sleeve"]);
  let temp = data["temp_value"];
  console.log(typeof temp);
  console.log(temp);
  if (data["isCelsius"] == "true"){
    temp = toFahrenheit(temp);
  }
  console.log(`the temp is ${temp}`);
  const condition = data["weather_value"];
  result = [];
  const rand = Math.floor(Math.random() * 10); //random var for long sleeves
  const rand1 = Math.floor(Math.random() * 10); // random var for sleevless
  const rand2 = Math.floor(Math.random() * 10); //rand var for closed toed shoes
  const rand3 = Math.floor(Math.random() * 10); //rand var for dress


  //Dress
  if(rand3 <= 3 && temp >=70) {
    pickRandomItem("dresses", clothing_sort, result);
  }
  else{

    //Top
    if (temp <=35 && !(empty(clothing_sort["coats"]))) {
      pickRandomItem("coats", clothing_sort, result);
      pickRandomItem("sweaters", clothing_sort, result);
      pickRandomItem("short_sleeve", clothing_sort, result);
    }
    else if (temp <= 50 && !(empty(clothing_sort["coats"]))) {
      pickRandomItem("coats", clothing_sort, result);
      pickRandomItem("short_sleeve", clothing_sort, result);
    }
    else if((temp <= 70 || temp <=75 && rand < 3) && !(empty(clothing_sort["long_sleeve"]))) {
      pickRandomItem("long_sleeve", clothing_sort, result);
    }
    else if(rand1 < 5 && !(empty(clothing_sort["short_sleeve"]))) {
      pickRandomItem("short_sleeve", clothing_sort, result);
    }
    else{
      pickRandomItem("sleeveless", clothing_sort, result);
    }

    //Bottom
    if (temp >= 70 && !(empty(clothing_sort["shorts"]))) {
      pickRandomItem("shorts", clothing_sort, result);
    }
    else{
      pickRandomItem("pants", clothing_sort, result);
    }
  }

  //Shoes
  console.log(`condition: ${condition} empty: ${!(empty(clothing_sort["boots"]))} weather: ${data["weather_checkbox"]}`)
  if ((condition == "rain" || condition == "snow") && !(empty(clothing_sort["boots"])) && data["weather_checkbox"]) {
    pickRandomItem("boots", clothing_sort, result);
  }
  else if(temp >= 70 && rand2 > 5 && !(empty(clothing_sort["open_toed"]))) {
    pickRandomItem("open_toed", clothing_sort, result);
  }
  else {
    pickRandomItem("closed_toed", clothing_sort, result);
  }

  if(data["accessories_checkbox"]){
    pickRandomItem("accessories", clothing_sort, result);
  }

  return result;
}



//pass through the category to pick random item that complies with the users filters
function pickRandomItem(category, clothing_sort, arr) {
  const index = Math.floor(Math.random() * clothing_sort[category].length);
  if (clothing_sort[category].length != []) {
    arr.push(clothing_sort[category][index]);
  }
  // pass dict as param
  // if category name matches key in dict, then choose random elem from the
  // array stored as a value
}

function empty(arr) {
  return arr == [];
}

function toFahrenheit(c){
  return (parseFloat(c) * (9.0/5.0) + 32).toString();
}
module.exports = { generateOutfit };
