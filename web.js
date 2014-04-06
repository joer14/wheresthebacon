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
    var location = tokens[0].toLowerCase();
    var food = tokens[1].toLowerCase();

    getClosest(location,food);
});

app.get('/text',function(req,res){

    var url = require('url');
    var query = url.parse(request.url,true).query;

    getClosest(query.location,query.food);
});

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
