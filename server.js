var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var output;
var PythonShell = require('python-shell');
var sendSomeMail = require('./email_notifications.js');
var recipients = ""


function check() {
    request('https://www.whitehouse.gov/feed/press', function(error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (body.indexOf("Honoring") != -1 || body.indexOf("half-mast") != -1 || body.indexOf("flag") != -1 || body.indexOf("half-staff") != -1) {
            output = "Flag is at half staff";
            python();
        } else {
            output = "Flag is not at half staff.";
        }
    });
}

function render() {
    app.get('/', function(req, res) {
        res.send(output);
    })

    app.listen(port, function() {
        console.log("Listening on " + port);
    });
}

function python() {
    var pyshell = new PythonShell('test.py');
    pyshell.on('message', function(message) {
        console.log(message);
        if (message == "true") {
            console.log("action");
            sendSomeMail(recipients);
        } else if (message == "false") {
            console.log("reaction");
        }
    });
}
setTimeout(check, 200);
render();


//app.get('/', function (req, res) {
//if(statement) {
// res.send("Half staff statement found!");
//}
// else {
//  res.send("No half staff statement found!");
//}
//})
