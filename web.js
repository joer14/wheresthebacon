//web.js

//our twilio number 2406502344
//http://127.0.0.1:3000/send?to=2025961749&message=helloworld
var express = require("express");
var mongoose = require('mongoose');

var accountSid = 'AC832af666a512f7edf14851909c6976f9';
var authToken = "your-auth-token";

var client = require('twilio')(accountSid, authToken);

//var http = require('http');
//var _ = require('lodash-node');

// var logfmt = require("logfmt");
var app = express();

var port = Number(process.env.PORT || 5000);
var Meal = null
mongoose.connect('mongodb://localhost/test');

function whichmeal(){
	var hour = date.getHours()
	if(hour <= 11)return 'breakfast'
	else if(hour >= 5 )return 'dinner'
	else return 'lunch'		
}

if (typeof Number.prototype.toRad == 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

function geolocation(lat,lon){
	this.lat = lat;
	this.lon = lon;
}

//matches dining hall name to GPS coordinate
function fetchLocation(loc){
	var dhL;

	console.log("from fetchLocation, loc is:" + loc);
	if (loc == "crown") {
		 dhL = new geolocation(36.999974688794,-122.05444693565);
	}

	if (loc == "merril"){
		dhL = new geolocation(36.999974688794,-122.05444693565);
	}

	if (loc == "cowell"){
		dhL = new geolocation(36.996991744785,-122.0530629158);
	}

	if (loc == "stevenson"){
		dhL = new geolocation(36.996991744785,-122.0530629158);
	}

	if (loc == "porter"){
		dhL = new geolocation(36.994365371902,-122.06584632396);
	}
	if (loc == "kresge"){
		dhL = new geolocation(36.994365371902,-122.06584632396);
	}
	if (loc == "eight"){
		dhL = new geolocation(36.991587873187,-122.06532329321);
	}
	if (loc == "oakes"){
		dhL = new geolocation(36.991587873187,-122.06532329321);
	}
	if (loc == "nine"){
		dhL = new geolocation(37.001093932027,-122.05775812268);
	}
	if (loc == "ten"){
		dhL = new geolocation(37.001093932027,-122.05775812268);
	}
	return dhL;
}


//calculates distance between two geolocation objects using the haversine formula
//see http://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(loc1,loc2) {
	var R = 6371;
	console.log(loc1);
	console.log(loc2);
	var dLat = (loc2.lat - loc1.lat).toRad();
	var dLon = (loc2.lon - loc1.lon).toRad();
	var lat1 = loc1.lat.toRad();
	var lat2 = loc2.lat.toRad();

	//haversine formula
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}


var date = new Date()

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!


	  var foodSchema = mongoose.Schema({
	    	fooditem: String,
	    	meals: String,
	    	dininghalls: String
		})

	foodSchema.methods.registerMeal = function (food) {
	  this.meals.push(food)
	  console.log('Food pushed')
	}

	foodSchema.methods.registerDiningHall = function (dh){
		this.meals.push(dh)
		console.log('dh pushed')
	}



	/*
		//var silence = new Meal({ name: 'Silence' })
		//console.log(silence.name) // 'Silence'
		//var fluffy = new Kitten({ name: 'fluffy' });

		//fluffy.save(function (err, fluffy) {
	  	//if (err) return console.error(err);
	  	console.log('save successful')
	  	//fluffy.speak();
		});
	*/

	Meal = mongoose.model('Meal', foodSchema);

	var date = new Date()

	  var foodSchema = mongoose.Schema({
	    	fooditem: String,
	    	meals: String,
	    	dininghalls: String
		})

	foodSchema.methods.registerMeal = function (food) {
	  this.meals.push(food)
	  console.log('Food pushed')
	}

	foodSchema.methods.registerDiningHall = function (dh){
		this.meals.push(dh)
		console.log('dh pushed')
	}



	/*
		//var silence = new Meal({ name: 'Silence' })
		//console.log(silence.name) // 'Silence'
		//var fluffy = new Kitten({ name: 'fluffy' });

		//fluffy.save(function (err, fluffy) {
	  	//if (err) return console.error(err);
	  	console.log('save successful')
	  	//fluffy.speak();
		});
	*/


	Meal.find(function (err, food) {
			if (err) return console.error(err);
			console.log(food)
	})

});


app.configure(function(){
  app.use(express.static(__dirname + '/static'));
});

app.get('/send',function(req,res){

    // These vars are your accountSid and authToken from twilio.com/user/account
    ///send?to=2025961749&message=helloworld

    var args = req.query;

    client.messages.create({
        body: args.message,
        to: args.to,
        from: "+2406502344",
    }, function(err, message) {
        if (err) {
            console.log(err);
            res.send(err);

        }
        console.log(message.sid);
        res.send(message.sid);
    });
});

app.get('/recv',function(req,res){
    var message = req.body.Body;
    var from = req.body.From;
    var tokens = message.split(" ");
    var loc = tokens[0].toLowerCase();
    var food = tokens[1].toLowerCase();

    getClosest(loc,food);
});

app.get('/text',function(req,res){

    var url = require('url');
    var query = url.parse(req.url,true).query;

    res.send("?"+getClosest(query.loc,query.food));
});

function getClosest(loc,food){
	var dh = loc;
	console.log("food: " + food);
	console.log("loc: " + loc);
	var dhs = Meal.find({'fooditem':food, 'meals': whichmeal()}, 'dininghalls');

	//var dhs = ["eight","nine","porter"];

	var lowest;
	var lowestDH;

	//console.log(fetchLocation(dh));

	var lowest = calculateDistance(fetchLocation(dh),fetchLocation(dhs[0]));

	for (var i = 0; i < dhs.length; i++) {
		//console.log("i is: "+i);
		//console.log("comparing "+JSON.stringify(fetchLocation(dh)) + "and "+ JSON.stringify(fetchLocation(dhs[i])));
		distance = calculateDistance(fetchLocation(dh),fetchLocation(dhs[i]));
		//console.log("distance is: " + distance);
		if (distance < lowest) {
			lowest = distance;
			lowestDH = dhs[i];
		}
	}
	//console.log("lowestDH :" + lowestDH);
	return lowestDH;
}


app.get('/joe', function(req, res){
	//sending maybe food, maybe location
	//returning list of dining halls 
	var message = req.query.message.toLowerCase();
	message = message.replace(/^\s+|\s+$/g,'')
	console.log(message)
	Meal.find({'fooditem':message, 'meals': whichmeal()}, 'dininghalls', function(err, dhs){
		  if (err) return handleError(err);
  			//console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation)
  			console.log(dhs)
	}
	//console.log(req.route.params);
)})


app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

//app.get('')



//httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=30&dtdate=4%2F8%2F2014&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'eight')

//console.log(dhinfo.results)

app.listen(port);
