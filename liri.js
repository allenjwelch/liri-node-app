// NPM PACKAGES
require("dotenv").config();
const keys = require("./keys.js");
const figlet = require('figlet');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs'); 
const help = require('inquirer'); 

// EX: fs.readFile('bank.txt', 'utf8', (err,data) => {

// USER INPUTS
let liriCmd = process.argv[2]; 
let userInput = process.argv; 
  userInput.splice(0, 3);
let songName;
let movieName;

// KEYS 
const spotify = new Spotify(keys.spotify); 
const client = new Twitter(keys.twitter);

// console.log(client.options); 
// console.log(spotify.credentials);

liriCommands(); 

function liriCommands() {
  switch (liriCmd) {
    case 'my-tweets':
      twitterGet(); 
      break; 
    case 'spotify-this-song':
      if (typeof userInput[0] === 'undefined') {
        songName = 'the sign ace of base'; 
        spotifyGet(); 
      } else {
        songName = userInput.join(' '); 
        console.log(songName); 
        spotifyGet(); 
      }
      break; 
    case 'movie-this':
      if (typeof userInput[0] === 'undefined') {
        movieName = 'Mr.Nobody'; 
        omdbGet();  
      } else {
        movieName = userInput.join(' '); 
        omdbGet(); 
      }
      break; 
    case 'do-what-it-says':
      doIt(); 
      break; 
    case 'help':
      needHelp(); 
      break; 
  }
}

function needHelp() {
  help
  .prompt([
    {
      type: 'list', 
      message: 'Select an option below:', 
      choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
      name: 'userHelp'
    }
  ])
  .then(inputA => {
    if (inputA.userHelp === 'spotify-this-song' || inputA.userHelp === 'movie-this') {
      help
      .prompt([
        {
          type: 'input', 
          message: 'What would you like to search?', 
          name: 'userSearch'
        }
      ])
      .then(inputB => {
        liriCmd = inputA.userHelp; 
        userInput = inputB.userSearch; 
        userInput = userInput.split(' ');  
        console.log('userInput ' + userInput); 
        console.log('liriCmd '  + liriCmd); 
        liriCommands();
      }); 
    } else {
      liriCmd = input.userHelp; 
      console.log(liriCmd); 
      liriCommands();
    }
  }); 
}

function doIt() {
  doItFig(); 
  setTimeout(() => {
    fs.readFile('random.txt', 'utf-8', (err,data) => {
      if (err) { return console.log(err); }
      const readFileArr = data.split(','); 
        liriCmd = readFileArr[0];
        userInput = readFileArr[1].split(' '); 
        console.log('=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/='); 
      liriCommands(); 
    })
  }, 500); 
}

function omdbGet() {
  omdbFig(); 
  const omdbURL = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`;
  setTimeout(() => {
    request(omdbURL, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        const data = JSON.parse(body);
        console.log('\n=====================================');
        console.log(`Title: ${data.Title}`);
        console.log(`Year: ${data.Year}`);
        console.log(`IMDB Rating: ${data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
        console.log(`Country: ${data.Country}`);
        console.log(`Language: ${data.Language}`);
        console.log(`Actors: ${data.Actors}`);
        console.log(`Plot: ${data.Plot}`);
        console.log('=====================================');
      }; 
    });
  }, 500); 
} 

function spotifyGet() {
  spotifyFig(); 
    setTimeout(() => {
      spotify.search({ type: 'track', query: songName }, function(err, data) {
        if(err) throw err; 
        // console.log(data.tracks.items[0]); 
        console.log('\n=====================================');
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Track: ${data.tracks.items[0].name}`); 
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        console.log(`Link: ${data.tracks.items[0].album.external_urls.spotify}`);
        console.log('=====================================');
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
        console.log('\n=====================================');
        console.log(`Date: ${tweet.created_at}`);  // Statuses 
        console.log(`\n${tweet.text}`);  // Statuses 
        console.log('=====================================');
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
    font: 'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
    console.log('\n"Liri, I\'d like some music to set the mood."')

  });
}

function omdbFig() {
  figlet('OMDB', {
    font: 'slant',
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
    font: 'Crawford2',
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