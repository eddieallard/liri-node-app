var test = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

var whatToDo = process.argv[2];
var UserInput = process.argv.slice(3).join(" ");



function spotifyThis(UserInput) {
    spotify
        .search({
            type: 'track',
            query: UserInput,
            limit: 5
        })
        .then(function(response) {
            console.log(JSON.stringify(response.tracks.items[0], null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concertThis() {
    axios.get(`https://rest.bandsintown.com/artists/${UserInput}/events?app_id=codingbootcamp`)
        .then(function (response) {
            response.forEach(concert => {
                var newDate = moment(concert.datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")
                console.log(`venue: ${concert.venue.name}`);
                console.log(`City ${concert.venue.city}`);
                console.log(`Date: ${newDate}`);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis() {
    axios.get(`http://www.omdbapi.com/?t=${UserInput}&y=&plot=short&apikey=trilogy`)
    .then(function(response) {
        console.log(response.data);
        response.forEach(movie => {
        console.log(`Title: ${movie.title}`);
        console.log(`Year: ${movie.year}`);
        console.log(`IMDB Rating: ${movie.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${movie.ratings.source.value}`);
        console.log(`Country: ${movie.country}`);
        console.log(`Language: ${movie.language}`);
        console.log(`Plot: ${movie.plot}`);
        console.log(`Actors: ${movie.actors}`);
        })
        .catch(function (err) {
            console.log(err);
        })
      
  })
  .catch(function(error) {
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

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
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

switch (UserInput) {

    case "spotify-this-song":
        spotifyThis(UserInput);
        break;

    case "movie-this":
        movieThis(UserInput);
        break;

    case "concert-this":
        concertThis(UserInput);
        break;

    case "do-what-it-says":
        doWhatItSays(UserInput);
        break;
}
};
