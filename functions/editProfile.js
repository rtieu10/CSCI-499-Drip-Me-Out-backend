const Parse = require("parse/node");
Parse.initialize(
  "8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1",
  "YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W",
  "jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe"
);
Parse.serverURL = "https://parseapi.back4app.com/";

async function editProfile(data, res) {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  query.equalTo("email", data["email"]);
  try {
    const results = await query.find();
    const user = results[0];
    const username = `${data["firstname-profile"]} ${data["lastname-profile"]}`;
    user.set("username", username);
    user.set("zipcode", data["zipcode-profile"]);
    user.set("isCelsius", data["isCelsius"]);
    await user.save(null, { useMasterKey: true });
    res.end("Changed");
  } catch (error) {
    console.log("Error: " + error.code + " " + error.message);
    res.write("error");
    res.end();
  }
}

module.exports = { editProfile };
