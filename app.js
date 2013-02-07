
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , request = require('request');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Rutas */
app.get('/', function(req, response){
  
  var options = {
    protocol : "http",
    host : "search.twitter.com",
    pathname : "/search.json",
    query : {q: "node js", rpp : "10"}
  };

  var searchURL = url.format(options);

  request(searchURL, function(err, res, body){
    
    var tweets = JSON.parse(body).results;
    response.render('index', {
        tweets: tweets
    });
    
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
