//web.js


var express = require("express");
var mongoose = require('mongoose');

// var logfmt = require("logfmt");
var app = express();

var port = Number(process.env.PORT || 5000);

mongoose.connect('mongodb://localhost/test');


function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  var kittySchema = mongoose.Schema({
    name: String
	})

	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({ name: 'Silence' })
	console.log(silence.name) // 'Silence'
	var fluffy = new Kitten({ name: 'fluffy' });

	fluffy.save(function (err, fluffy) {
  	if (err) return console.error(err);
  	console.log('save successful')
  	//fluffy.speak();
	});

});


app.configure(function(){
  app.use(express.static(__dirname + '/static'));
});


app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});
var dhinfo = httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=30&dtdate=4%2F8%2F2014&apikey=2323b50a71ade7d336c82c9f9dd5c072')
console.log(dhinfo)

app.listen(port);
