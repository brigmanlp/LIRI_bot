//Twitter NPM
// npm install twitter
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

//Spotify NPM
// npm install spotify
//lookup: function({ type: 'artist OR album OR track', id: 'Spotify ID Hash' }, hollaback)
//search: function({ type: 'artist OR album OR track', query: 'My search query' }, hollaback)
//get: function(query, hollaback) -- See http://developer.spotify.com/en/metadata-api/overview/ 


var spotify = require('spotify');

spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

    // Do something with 'data' 
});

//Request NPM
var request = require('request');
request('http://www.google.com', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage. 
    }
})