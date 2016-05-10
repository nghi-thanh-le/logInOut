var express = require("express"),
    connect = require("node-mysql"),
    path = require("path"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    sha1 = require("sha1"),
    mysql = require("mysql");

// connect to database section
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

//middle ware section
var app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// app.VERB section
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/signup.html"));
});

app.post("/signup", function (req, res) {
    // get the form submit file
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password)
    };

    // insert to user table
    var query = connection.query("INSERT INTO users SET ?", post,function (err, result) {
        if (err) throw err;

        res.sendFile(__dirname + "/views/index.html");
    });
    console.log(query.sql);
});

/*
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "views/login.html"));
})*/;

app.post("/signup", function (req, res) {

});

// server
app.listen(3000, function() {
    console.log("Server listen to port 3000");
});
