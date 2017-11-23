var feed = require('feed-read'),
    port = process.env.PORT || 8000,
    urls = [
        "https://www.whitehouse.gov/feed/press"
    ];
var express = require('express');
var app = express();
var PythonShell = require('python-shell');
var sendSomeMail = require('./email_notifications.js');
var recipients = "" //pull from CSV file for this list
function fetch() {
    for (var j = 0; j < urls.length; j++) {


        feed(urls[j], function(err, articles) {


            for (var i = 0; i < articles.length; i++) {



                check(articles[i]);

            }
        });
    }
}

function check(a) {
    var output;
    if (a.title.indexOf("Honoring") == -1 || a.title.indexOf("half-mast") != -1 || a.title.indexOf("flag") != -1 || a.title.indexOf("half-staff") != -1) {
        console.log("Found one");
        output = (a.title + "\n" + a.published + "\n" + a.content);
        display(output);
    } else {
        console.log("Not found");
        output = "No half staff statements";
        display(output);
    }
}

function display(output) {
    app.get('/', function(req, res) {
        res.send(output);
        python(output);
    })
}

function python(output) {
    var pyshell = new PythonShell('check.py');
    pyshell.on('message', function(message) {
        console.log(message);
        if (message == "true") {
            sendSomeMail(recipients, output);
            console.log("Sending email notifications");
        } else if (message == "false") {
            console.log("Already sent");
        }
    });
}
setTimeout(fetch, 200);
app.listen(port, function() {
    console.log("Listening on " + port);
});
