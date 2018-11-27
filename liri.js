//code to read and set any environment variables 
//with the dotenv package:
require("dotenv").config();

//Add the code to import the `keys.js` file and store it in a variable.
const keys = require("./keys.js");
const axios = require("axios");
const spotify = require("spotify");
const OMDb = require("OMDb");
const fs = require("fs");

//add variables to input the command line arguments
const command = process.argv[2];
const query = process.argv[3];

//"concert-this" command
//request info from Bands in Town Artist Events API

var bandsURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//access spotify key example:
//var spotify = new Spotify(keys.spotify);

//OMDb api call
var omdbURL = "http://www.omdbapi.com/?apikey=258c9874&" + movie;
