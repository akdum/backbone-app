/**
 * A simple API hosted under localhost:8080/books
 */
var express = require('express');
var app = express();
var Twit = require('twit')
var bodyParser = require('body-parser');
var client = null;

function connectToTwitter(){
    client = new Twit({
    consumer_key: '8nVDxaPV33HRXOSNNW1iB9JlC',
    consumer_secret: 'dQFN7cfy3uHMJduKSMN2EydZZHT43KOD6H8aGwjsc3a9WDvhu6',
    access_token: '786107605135613952-g6bZovsIAtzCfzshkCJzHGBno4BTg0T',
    access_token_secret: 'GjpGcLsNob3gw4sr8mwWM6YY5czg1R5FDatnTVJdLOwg7'
    });
}

//get the app to connect to twitter.
connectToTwitter();

/**
 * Returns the twitter timeline for the current user
 **/
app.get('/timeline', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    client.get('statuses/home_timeline', { }, function (err, reply) {
    if(err){
        response.sendStatus(404);
    }
    if(reply){
        response.json(reply);
    }
    });
});

/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    client.get('users/show', {screen_name: 'akudm2007'}, function (err, reply) {
    if(err){
        console.log('Error: ' + err);
        response.sendStatus(404);
    }
    if(reply){
        response.json(reply);
        }
    });
})

/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile/:id', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    client.get('users/show', {screen_name: request.params.id}, function (err, reply) {
    if(err){
        response.sendStatus(404);
    }
    if(reply){
        response.json(reply);
    }
    });
});

/**
 * Runs a search given a query
 **/
app.get('/search/:query', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    //search term is
    var searchTerm = request.params.query;
    client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {
    if(err){
        response.sendStatus(404);
    }
    if(reply){
        response.json(reply);
    }
    });
});


//additional setup to allow CORS requests
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        response.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);
    //Parses the JSON object given in the body request
app.use(bodyParser.json());
app.use(express.static(__dirname));
//start up the app on port 8080
app.listen(8080);