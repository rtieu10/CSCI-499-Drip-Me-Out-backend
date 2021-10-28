const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"

function generateOutfit(data, res){
  fetchParse();
  organizeCatagories();
  pickClothing();
  return result

}

//get clothing items for the user
//reference addItem.js run to check the duplicate function
//user: a string containing user email (ex: rachel@test.com)
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

//iterate through the users clothing and organize by catagories
function organizeCatagories(arrClothings){

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

}
