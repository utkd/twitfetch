var express = require('express');
var twitter = require('twitter');
var twitkeys = require('./keys').keys;

var twitobj = new twitter(twitkeys);

var app = express();

app.configure(function(){
	app.use(express.logger());

	app.use(app.routes);
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
});

app.configure('development', function(){
	app.use(express.errorHandler({
		showStack: true,
		dumpExceptions: true
	}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.listen(8000);

app.get('/', function(request, response) {
	response.redirect('/index')	;
});

app.get('/index', function(request, response) {
	response.render('index', {
		pagetitle: 'Content Home'
	});
});

app.get('/tweets', function(request,response) {
	var keyword = request.query["keyword"];
	console.log("User searched for: " + keyword);
	
	twitobj.search(keyword, function(data){
		var tweetsArray = parseData(data);
		response.json({tweets: tweetsArray});
	});
});	

function parseData(json){
	var tweets = json.results;
	var textArray = [];
	for(var idx in tweets) {
		textArray.push(tweets[idx].text);
	}
	return textArray;
}
