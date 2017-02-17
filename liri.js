var input = process.argv[2];
var value = process.argv[3];
var request = require("request");

//code below grabs the data from keys.js
var keys = require('./keys.js');
// console.log(keys.twitterKeys);

//Twitter NPM
// npm install twitter
var Twitter = require('twitter');

//store data from keys.js in the variable client
var client = new Twitter(keys.twitterKeys);
// console.log(client);
var params = { screen_name: 'elle_sait_' } && {
    count: 5
};

function myTwitter() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            // if (err) throw err;
        }
        for (i = 0; i < tweets.length; i++) {
            // var number = i + 1;
            console.log(tweets[i].text);
        }
    });
}

if (input == "myTwitter") {
    myTwitter();
} else if (input == "spotifySong") {
    spotifySong(value);

} else if (input == "movieThis") {
    movieThis(value);
} else if (input == "random") {
    random();
}



//Spotify NPM
// npm install spotify
//lookup: function({ type: 'artist OR album OR track', id: 'Spotify ID Hash' }, hollaback)
//search: function({ type: 'artist OR album OR track', query: 'My search query' }, hollaback)
//get: function(query, hollaback) -- See http://developer.spotify.com/en/metadata-api/overview/ 


var spotify = require('spotify');

// function spotifySong(value) {
// spotify.search({ type: 'track', query: "" }, function(err, data) {
//     if (err) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//     console.log(data);
// });
// }

function spotifySong(value) {
    if (value == null) {
        value = 'blank space';
    }
    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log(' ');
        }
    });
}

//Request NPM
// Request to grab data from the [OMDB API](http://www.omdbapi.com)


function movieThis(value) {
    // if (value == null) {
    //     value = "Remember the Titans";
    // }
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json&tomatoes=true",
        function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover specific information
                console.log("Title: " + JSON.parse(body).Title +
                    "\nRelease Year: " + JSON.parse(body).Year +
                    "\nRated: " + JSON.parse(body).Rated +
                    "\nimdbRating: " + JSON.parse(body).imdbRating +
                    "\nCountry where produced: " + JSON.parse(body).Country +
                    "\nLanguage: " + JSON.parse(body).Language +
                    "\nPlot: " + JSON.parse(body).Plot +
                    "\nActors: " + JSON.parse(body).Actors +
                    "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating +
                    "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            }
        });
};
var fs = require("fs");
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifySong(dataArr[1]);
            }
        }
    });
}