### Overview
Introducing "LIRI". Also known as "Language Interpretation and Recognition Interface". We verify on the server end that the data is able to retrive information before sending to the client side. Finally a way for users to search for their favorite movie, songs or artist coming to town. 

# LIRI APP
LIRI, is a server based, command line Node.js centered app that recieves user parameters and exports data. It has the ability of communicating with the BandsInTown API service, The Open Movie Database (OMDB) and also Spotify API. Providing users with information regarding movies, concerts and music.

Also, LIRI offers a way for anyone to provide instructions via a local file on disk named "random.txt".

### To use the LIRI app:

1. Run the following for do-what-it-says: node liri.js "do-what-it-says" (will run 1 of the actions below by accessing random.txt)
2. Run the following for the OMDB search: node liri.js movie-this "movie"
3. Run this following command for BandsInTown: node liri.js concert-this "artist".
4. Run this following for Spotify Searches: node liri.js spotify-this-song "song"

### Screenshots:

* [Link to the app](https://eddieallard.github.io/liri-node-app/)

* [Spotify-this-song-Screenshot](ClassRepo_Local\Homework\Node - Liri App\liri-node-app\images\spotify this song.PNG)
* [Concert-This-Screenshot](ClassRepo_Local\Homework\Node - Liri App\liri-node-app\images\concert this.PNG)
* [Movie-This-Screenshot](ClassRepo_Local\Homework\Node - Liri App\liri-node-app\images\movie this.PNG)

### Video Link:

* [Video](https://drive.google.com/file/d/1UzOaQ1KEHx3l-MlhIP2IW1AK5YGKrauE/view?usp=sharing)


