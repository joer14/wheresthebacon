var express = require('express');
var app = express();

app.get('/send',function(req,res){

    // These vars are your accountSid and authToken from twilio.com/user/account

    var accountSid = 'AC832af666a512f7edf14851909c6976f9';
    var authToken = "your-auth-token";

    var client = require('twilio')(accountSid, authToken);

    var args = req.query; 

    client.messages.create({
        body: args.message,
        to: args.to,
        from: "+OUR_NUMBER", 
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
    var query  = url.parse(request.url,true).query;

    getClosest(query.location,query.food);
});

