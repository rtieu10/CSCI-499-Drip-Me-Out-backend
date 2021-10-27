const Parse = require('parse/node');
Parse.initialize("8dTo5v19t0vWVBB4OpdmD3g7EWSGx0P93kQxQQZ1","YA2lm6qSHNHU72qWeoTwKUXC3rGIHlhMCYqcG05W","jQWPaIzUhciZlOvs8fm8Jweo2E83ESlktBX29kWe")
Parse.serverURL = "https://parseapi.back4app.com/"


async function parseUserSignup(usern, email, pass, zip, res){
	const user = new Parse.User();
	user.set("username", usern);
	user.set("password", pass);
	user.set("email", email);
	user.set("zipcode", zip)

	try {
		await user.signUp();
		// Hooray! Let them use the app now.
		res.write("signedup")
		res.end();
	} catch (error) {
		// Show the error message somewhere and let the user try again.
		console.log("Error: " + error.code + " " + error.message);
		res.write("unsuccessful");
		res.end();
	}
}

async function parseUserLogin(email, pass, res){
	try{
		const user = await Parse.User.logIn(email, pass);
		res.write("verified")
		res.end();
	} catch (error) {
		console.log("Error: " + error.code + " " + error.message);
		res.write("unsuccessful");
		res.end();
	}
}

module.exports = { parseUserSignup, parseUserLogin };
