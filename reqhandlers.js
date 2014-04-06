var express = require('express');
require('/usr/local/lib/node_modules/twilio');
var app = express();

app.get('/send',function(req,res){

    // These vars are your accountSid and authToken from twilio.com/user/account

    var accountSid = 'ACa20026a3bb9bf39fec1fd1527ecd8527';
    var authToken = "6f2c24d375dc3173f13bee32686cd48b";

    var client = require('twilio')(accountSid, authToken);

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
    var query  = url.parse(req.url,true).query;

    res.send(query);
    getClosest(query.location,query.food);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});