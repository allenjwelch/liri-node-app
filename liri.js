require("dotenv").config();

const keys = require("./keys.js");
const figlet = require('figlet');
const fs = require('fs'); 
// EX: fs.readFile('bank.txt', 'utf8', (err,data) => {

const liriCmd = process.argv[2]; 
const songName = process.argv[3]; 
const movieName = process.argv[3]; 
  
// const spotify = new Spotify(keys.spotify);
const client = keys.twitter;
const ombdURL = `http://www.omdbapi.com/?apikey=trilogy&s=${movieName}`; 

console.log(client); 

switch (liriCmd) {
  case 'my-tweets':
    // code; 
    break; 
  case 'spotify-this-song':
    // code; 
    break; 
  case 'movie-this':
    // code; 
    break; 
  case 'do-what-it-says':
    // code; 
    break; 
}

// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

// 3. `node liri.js movie-this '<movie name here>'`
//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.



// figlet('Figlet!!', {
//   font: 'doh',
//   horizontalLayout: 'default',
//   verticalLayout: 'default'
// }, function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });


// module.exports = {
//   essentials: essentials,
//   niceToHaves: niceToHaves
// };