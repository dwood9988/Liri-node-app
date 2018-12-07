require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");

// var request = require("request");
var input = JSON.stringify(process.argv.slice(3).join("+"));
var liriResponse = process.argv[2];
var moment = require("moment");

//-------this is to hide my api keys------\\
var spotify = new Spotify(keys.spotify);
//----------------------------------------\\

//--aesthetic divider
var divider = "\n====================\n\n";

//switches 
switch (liriResponse) {
    case "spotify-this-song":
        if (input === undefined) {
            input = "Down On Dream Street"
            spotifyThis();
        }
        spotifyThis();
        break;

    case "movie-this":
        if (input === undefined) {
            input = "Home Alone"
            movieThis();
        }
        movieThis();
        break;

    case "concert-this":
        concertThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default: console.log("\n" + "==================== type any command (search term wrapped in quotes) after 'node liri.js': ====================\n" +
        "spotify-this-song" + "\n" +
        "concert-this" + "\n" +
        "movie-this" + "\n" +
        "do-what-it-says" + "\n");
        break;
};


//--spotifyThis function 
function spotifyThis() {

    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            console.log("====================")
            console.log(`Name Of Artists: ${response.tracks.items[0].artists[0].name}`)
            console.log(`Name Of Song: ${response.tracks.items[0].name}`)
            console.log(`Preview URL: ${response.tracks.items[0].preview_url}`)
            console.log(`From The Album: ${response.tracks.items[0].album.name}`)
            console.log("====================")
        })
        .catch(function (err) {
            console.log(err);
        });
}

//--movieThis function
function movieThis() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.

    axios.get(queryUrl)
        .then(function (response) {
            console.log("====================")
            console.log("Title: " + response.data.Title);
            console.log("Runtime: " + response.data.Runtime);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rated: " + response.data.Rated);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors); 
        console.log("====================")
        });
};

function concertThis(){
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(queryUrl)
        .then(function(response){
            for (var i = 0; i < response.data.length; i++) {
                console.log("====================")
                console.log(input)
                console.log(`Venue: ${response.data[i].venue.name}`)
                console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                console.log("====================")
                console.log("");
            };
        });
}