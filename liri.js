//code to read and set any environment variables 
//with the dotenv package:
require("dotenv").config();

//Add the code to import the `keys.js` file and store it in a variable.
const keys = require("./keys.js");
const axios = require("axios");
const spotify = require("spotify-api"); //spotify-api == node-spotify-api
const newSpotify = new spotify(keys.spotify);
const fs = require("fs");
const moment = require("moment");

//add variables to input the command line arguments
// var used for terminal command arguments
let commandArg = process.argv[2];
let userInput = process.argv.slice(3).join(" ");


//Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
if (commandArg === "concert-this") {
    getArtist(keys.concrt);
} else if (commandArg === "spotify-this-song") {
    getSong();
} else if (commandArg === "movie-this") {
    getMovie();
} else if (commandArg === "do-what-it-says") {
    command();
} else {
    console.log("Please enter one of the following commands: concert-this, spotify-this-song, movie-this, do-what-it-says.");
}

//"concert-this" command
//request info from Bands in Town Artist Events API

function getArtist() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "events?app_id=" + keys.concrt).
    then(function(response){
        for (var i = 0; i < response.data.length; i++){
            var newTime = moment(respnse.data[i].datetime).format("MM DD YYY")

        // console.log(newTime)
        console.log(
`
----------------
Name: ${response.data[i].venue.name}
Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}
Concert Date: ${newTime}
----------------
`
        )

        }
    }).catch(function (error){
        console.log(error);
    });
};

// var bandsURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//access spotify key example:
//var spotify = new Spotify(keys.spotify);

//OMDb api call

axios.get(omdbURL).then(function(response){
    var movData = response.data;
    console.log(movData);

});
};
findMovie();