// ABSTRACING CONCERNS ARE ATTACHED TO VARIABLES

var test = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var whatToDo = process.argv[2];
var UserInput = process.argv.slice(3).join(" ");

// SWITCH LOGIC FOR CONCERT-THIS, SPOTIFY-THIS-SONG, MOVIE-THIS AND DO-WHAT-IT-SAYS

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

// FUNCTION FOR SPOTIFY BELOW THIS LINE

function spotifyThis() {
    spotify
        .search({
            type: 'track',
            query: UserInput,
            limit: 10
        })
        .then(function (response) {
            var songsArray = response.tracks.items;
            songsArray.forEach(song => {
                // console.log(songsArray);
                console.log(song.artists[0].name);
                console.log(song.name);
                console.log(song.preview_url);
                console.log(song.album.name);
                console.log("-----------------------")
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

// FUNCTION FOR CONCERT-THIS BELOW THIS LINE

function concertThis() {
    axios.get(`https://rest.bandsintown.com/artists/${UserInput}/events?app_id=codingbootcamp`)
        .then(function (response) {
            response.data.forEach(concert => {
                var newDate = moment(concert.datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
                console.log(`venue: ${concert.venue.name}`);
                console.log(`City ${concert.venue.city}`);
                console.log(`Date: ${newDate}`);
                console.log("-----------------------")
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

// FUNCTION FOR MOVIE-THIS BELOW THIS LINE

function movieThis() {
    axios.get(`http://www.omdbapi.com/?t=${UserInput}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
            // console.log(response.data);
            var movie = response.data;
            console.log("-----------------------")
            console.log(`Title: ${movie.Title}`);
            console.log(`Year: ${movie.Year}`);
            console.log(`IMDB Rating: ${movie.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${movie.Ratings[1].Value}`);
            console.log(`Country: ${movie.Country}`);
            console.log(`Language: ${movie.Language}`);
            console.log(`Plot: ${movie.Plot}`);
            console.log(`Actors: ${movie.Actors}`);
            console.log("-----------------------")
        })
        .catch(function (err) {
            console.log(err);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// FUNCTION FOR DO-WHAT-IT-SAYS BELOW THIS LINE

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArray = data.split(",");
        var personInput1 = dataArray[0];
        var personInput2 = dataArray[1];
        if (personInput1 === "spotify-this-song") {
            spotifySong(personInput2);
        }
        if (personInput1 === "Movie-this") {
            movieChoice(personInput2);
        }
        if (personInput1 === "concert-this") {
            theConcert(personInput2);
        }
    })
}