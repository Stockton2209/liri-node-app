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


function getSong() {
    if (userInput === ""){
        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
        .then(function(data){
            console.log(
`
----------------
Artist(s): ${data.artists[0].name}
Track: ${data.name}
Album: ${data.album.name}
Preview Link: ${data.preview_url}
----------------
`
            );
        }
        )} else {
            spotify.search({ type: 'track', query: userInput, limit: 20}, function (err, data) {
                if (err) {
                    console.log("Error: " + err);
                } else {
                    for (var i = 0; i < data.tracks.items.length; i++){
                        console.log(
`
----------------
Artist(s): ${data.tracks.items[i].artists[0].name}
Track: ${data.tracks.items[i].name}
Album: ${data.tracks.items[i].album.name}
Preview Link: ${data.tracks.items[i].preview_url}
----------------
`
                        );
                    }
                }
            })
        }
    // artist(s)
    // the song's name
    // a preview link of the song from spotify
    // the album that the song is from
    // if no song is provided, default to "Dirty Deeds" by ACDC
} 


function getMovie() {
    if (userInput === ""){
        axios.get("http://www.omdbapi.com/?t=Deadpool&apikey=trilogy").then(function(res){
            console.log(
`
----------------
Title: ${res.data.Title}
Release: ${res.data.Year}
IMDB Rating: ${res.data.imdbRating}
Rotten Tomatoes Rating: ${res.data.Ratings[1].Source}
Country: ${res.data.Country}
Language: ${res.data.Language}
Plot: ${res.data.Plot}
Actors: ${res.data.Actors}
----------------
`
            );
        })
    } else {
        let m = userInput.replace(/ /g, "+");
        console.log(m);
    axios.get("http://www.omdbapi.com/?t=" + m + "&apikey=trilogy").then(function(res){
        console.log(
`
----------------
Title: ${res.data.Title}
Release: ${res.data.Year}
IMDB Rating: ${res.data.imdbRating}
Rotten Tomatoes Rating: ${res.data.Ratings[1].Value}
Country: ${res.data.Country}
Language: ${res.data.Language}
Plot: ${res.data.Plot}
Actors: ${res.data.Actors}
----------------
`    
        );
    });
    // title of the movie
    // year the movie came out
    // imdb rating of the movie
    // rotten tomatoes rating of the movie
    // country where the movie was produced
    // language of the movie
    // plot of the movie
    // actors in the movie
    // if no movie is provided, default to Deadpool
    }
}


function command() {
    console.log(userInput + "4");
    fs.readFile("random.txt", "utf8", function(err, data){
        let array = data.split(",")
        userInput = array[1];
        if (array[0] === "") {
            console.log("Enter a command");
        } else if (array[0] === "concert-this") {
            getArtist(keys.concrt);
        } else if (array[0] === "spotify-this-song"){
            getSong();
        } else if (array[0] === "movie-this"){
            getMovie();
        } else if (array[0] === "do-what-it-says"){
            command();
        }
        console.log(array);
    });

    console.log("after calling readFile");
    //run "spotify-this-song" for "Dirty Deeds"
}


