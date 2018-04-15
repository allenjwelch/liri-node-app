// NPM PACKAGES
require("dotenv").config();
const keys = require("./keys.js");
const figlet = require('figlet');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs'); 
// EX: fs.readFile('bank.txt', 'utf8', (err,data) => {

// USER INPUTS
const liriCmd = process.argv[2]; 
let songName = process.argv; 
let movieName = process.argv; 
  movieName.splice(0,3); 


// KEYS 
const spotify = new Spotify(keys.spotify); 
const client = new Twitter(keys.twitter);

// console.log(client.options); 
// console.log(spotify.credentials);

switch (liriCmd) {
  case 'my-tweets':
    twitterGet(); 
    break; 
  case 'spotify-this-song':
    if (typeof songName[0] === 'undefined') {
      spotifyGetAoB(); 
    } else {
      var songNameStr = songName.join(' '); 
      spotifyGet(); 
    }
      break; 
  case 'movie-this':
    if (typeof movieName[0] === 'undefined') {
      var movieNameStr = 'Mr.Nobody'; 
      omdbGet();  
    } else {
      var movieNameStr = movieName.join(' '); 
      omdbGet(); 
    }
    break; 
  case 'do-what-it-says':
    // code; 
    doItFig(); 
    // setTimeout(() => {

    // }, 500); 
    break; 
}

// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


function omdbGet() {
  omdbFig(); 
  const omdbURL = `http://www.omdbapi.com/?apikey=trilogy&t=${movieNameStr}`;
  setTimeout(() => {
    request(omdbURL, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        const data = JSON.parse(body);
        console.log('\n====================')
        console.log(`Title: ${data.Title}`);
        console.log(`Year: ${data.Year}`);
        console.log(`IMDB Rating: ${data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
        console.log(`Country: ${data.Country}`);
        console.log(`Language: ${data.Language}`);
        console.log(`Actors: ${data.Actors}`);
        console.log(`Plot: ${data.Plot}`);
        console.log('====================')
      }; 
    });
  }, 500); 
} 

function spotifyGet() {
  spotifyFig(); 
    setTimeout(() => {
      spotify.search({ type: 'track', query: songNameStr }, function(err, data) {
        if(err) throw err; 
        // console.log(data.tracks.items[0]); 
        console.log('\n====================')
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Track: ${data.tracks.items[0].name}`); 
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        console.log(`Link: ${data.tracks.items[0].album.external_urls.spotify}`);
        console.log('====================')
      });
    }, 500); 
}

function spotifyGetAoB() {
  spotifyFig(); 
      setTimeout(() => {
      spotify.search({ type: 'track', query: 'the sign ace of base' }, function(err, data) {
        if(err) throw err; 
        // console.log(data.tracks.items[0]); 
        console.log('\nNeed a suggestion? How about...'); 
        console.log('\n====================')
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Track: ${data.tracks.items[0].name}`); 
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        console.log(`Link: ${data.tracks.items[0].album.external_urls.spotify}`);
        console.log('====================')
      });
    }, 500); 
}

function twitterGet() {
  // client.get(path, params, callback);
  tweetFig(); 
  setTimeout(() =>{
    client.get('https://api.twitter.com/1.1/favorites/list.json', function(err, tweets, response) {
      if(err) throw err;
      tweets.forEach(tweet => {
        console.log('\n====================')
        console.log(`Date: ${tweet.created_at}`);  // Statuses 
        console.log(`\n${tweet.text}`);  // Statuses 
        console.log('====================')
      })
    });
  }, 500);
}

function tweetFig() {
  figlet('Twitter', {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
    console.log('"Liri, what the **** is twitter?"')
  });
}

function spotifyFig() {
  figlet('Spotify', {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
    console.log('"Liri, I\'d like some music to set the mood."')

  });
}

function omdbFig() {
  figlet('OMDB', {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
    console.log('"Liri, what\'s on for movie night?"')

  });
}

function doItFig() {
  figlet('Do it!', {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
  });
}


// module.exports = {
//   essentials: essentials,
//   niceToHaves: niceToHaves
// };