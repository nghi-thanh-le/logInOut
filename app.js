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
app.set("view engine", "ejs");
// app.VERB section

/* SIGNUP */
app.get("/", function (req, res) {
    res.render("signup");
});

app.post("/signup", function (req, res, next) {
    // get the form submit file
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password)
    };

    // insert to user table
    connection.query("INSERT INTO users SET ?", post,function (err, result) {
        if (err) throw err;
        res.redirect("/user");
    });
});

/* LOGIN */
app.get("/login", function (req, res) {
    res.render("login");
});


app.post("/login", function (req, res) {
    // get user input
    var post = {
        username: req.body.username,
        password: sha1(req.body.password)
    };

    // get from database
    var query = "SELECT * FROM `users` WHERE `username` = '" + post.username + "' AND `password` = '" + post.password + "'";
    connection.query(query, function (err, results) {
        if(err) throw err;

        var result = results[0];
        console.log(result.userId + "_" + result.username + "_" + result.email + "_" + result.password);
    })
});

/* USER interface */
app.get("/user", function (req, res) {
    res.render("index");
});

/* ADMIN */
app.get("/admin", function (req, res) {

});

// server
app.listen(3000, function() {
    console.log("Server listen to port 3000");
});
