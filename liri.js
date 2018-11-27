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
// var used for terminal command arguments
var commandArg = process.argv[2];

//Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
if (commandArg === "concert-this") {
    getArtist();
} else if (commandArg === "spotify-this-song") {
    getSong();
} else if (commandArg === "movie-this") {
    getMovie();
} else if (commandArg === "do-what-it-says") {
    doWhatever();
} else {
    console.log("Please enter one of the following commands: concert-this, spotify-this-song, movie-this, do-what-it-says.");
}

//"concert-this" command
//request info from Bands in Town Artist Events API

// var bandsURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//access spotify key example:
//var spotify = new Spotify(keys.spotify);

//OMDb api call
var findMovie = function(movie) {

var omdbURL = "http://www.omdbapi.com/?apikey=258c9874&" + movie;

axios.get(omdbURL).then(function(response){
    var movData = response.data;
    console.log(movData);

});
};
findMovie();