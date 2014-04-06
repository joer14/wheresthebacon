var mongoose = require('mongoose');
var http = require('http');
var Meal = null

mongoose.connect('mongodb://localhost/test');
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

  Meal = mongoose.model('Meal', foodSchema);
  Meal.find(function (err, food) {
      if (err) return console.error(err);
      console.log(food)
  })

});


function httpGet(theUrl, meal, dininghall)
{
	http.get(theUrl, function(res) {
  		//console.log("Got response: " + res.read());
  		var body = ''
  		res.on('data', function (chunk) {
  			body += chunk
  		});
  		res.on('end', function() {
    		//console.log(body);
    		var dhinfo = JSON.parse(body)
    		var collection = dhinfo.results.collection1
    		for(var i = 0; i < collection.length; ++i){
/*
      			Meal.find({'fooditem':collection[i].Item.text}, function (err, food) {
    					if (err) return console.error(err);
   					console.log('I found' + food)
  				})*/
    				var fooditem = new Meal({ 
    					fooditem: collection[i].Item.text.toLowerCase(),
    					meals: meal,
    					dininghalls: dininghall 
    				});


  				fooditem.save(function (err, fooditem) {
    					if (err) return console.error(err);
    					console.log('save successful')
    					//fluffy.speak();
  				});

    		}
    		Meal.find(function(err, food){
					if (err) return console.error(err);
 					console.log('I found' + food)

				})
        //throw "exit";
    	//console.log(dhinfo.results.collection1[0].Item.text)
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
  		return null
	});
}

var date = new Date();
httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=30&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Breakfast+++served+until+11am&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'eight')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=30&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Lunch served until 2pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'eight')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=30&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Dinner+served+until+8pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'eight')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=5&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Breakfast+++served+until+11am&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'cowell')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=5&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Lunch served until 2pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'cowell')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=5&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Dinner+served+until+8pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'dinner', 'cowell')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=20&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Breakfast+++served+until+11am&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'crown')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=20&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Lunch served until 2pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'crown')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=20&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Dinner+served+until+8pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'dinner', 'crown')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=25&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Breakfast+++served+until+11am&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'porter')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=25&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Lunch served until 2pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'porter')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=25&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Dinner+served+until+8pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'dinner', 'porter')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=40&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Breakfast+++served+until+11am&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'breakfast', 'nine')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=40&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Lunch served until 2pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'lunch', 'nine')

httpGet('http://www.kimonolabs.com/api/ce6dd1oc?&?locationNum=40&dtdate=' 
  + date.getMonth() + '%2F' + date.getDate() + '%2F' + date.getYear() + 
  '&Dinner+served+until+8pm&apikey=2323b50a71ade7d336c82c9f9dd5c072', 'dinner', 'nine')

setTimeout(function() {
  console.log('destroy all humans');
  process.exit(code=0)
}, 9000);

