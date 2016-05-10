var express = require("express"),
    connect = require("node-mysql"),
    path = require("path"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    sha1 = require("sha1"),
    mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logInOut"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected to mysql database! " + connection.threadId);
});


var app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/signup.html"));
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.post("/", function (req, res) {

});

app.listen(3000, function() {
    console.log("Server listen to port 3000");
});
