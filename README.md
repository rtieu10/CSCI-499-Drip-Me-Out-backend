# Drip Me Out


Run `npm install` to install dependencies

Run `npm run start`

**Note**: Since backend has not been deployed, you will need your own OpenWeatherMap API key for weather-related functionalities

**File Name**: `credential.json`
```
{
  "apiKey": <<APIKEYHERE>>
}
```

## Description

This is the backend NodeJS server for the Drip Me Out! application. Utilizing a parse database as well as weatherAPI, this Node application is able to perform requests to generate outfits, upload clothing items, and many other functionalities.

By default it is communicating on port: 8080

## Endpoints

**Create a new account**: `/signup`\

**Log into a users account**: `/login`\

**WeatherAPI look up**: `/zipcode`\

**Get clothing items of a user**: `/closet`\

**Filter out clothing items of a user**: `/filterCloset`\

**Add an item to the users closet**: `/additem`\

**Look up info on a clothing item**: `/view"`\

**Edit clothing item info**: `/editItem`\

**Delete a clothing item**: `/remove`\

**Generate a personalized outfit**: `/generate`\

**Save an outfit**: `/saveOutfit`\

**Get names of saved user outfits**: `/getOutfits`\

**Get info of an outfit**: `outfitLookUp`\

**Delete an outfit**: `/deleteOutfit`\

**Retrieve item for custom outfit**: `/getItemsById`\

**Edit users profile**: `/editProfile`\


## Links

Front-End Repo: **https://github.com/HashirAKhan/CSCI-499-Drip-Me-Out**

Previous Version: **https://hashirakhan.github.io/CSCI-499-Drip-Me-Out/#/**
