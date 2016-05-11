var express = require("express"),
    connection = require("../database/mysqlDatabase");
var router = express.Router();

connection.connect(function (err) {
    if(err) throw err;
    console.log("Connect to database");
});

router.get("/", function (req, res) {
    res.render("signup");
});

router.post("/", function (req, res) {
    // get the form submit file
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // insert to user table
    connection.query("INSERT INTO users SET ?", post, function (err, result) {
        if (err) throw err;

        console.log(result);

        //res.redirect("/profile");
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", function (req, res) {
    // get user input
    var post = {
        username: req.body.username,
        password: req.body.password
    };

    // get from database
    var query = "SELECT userId, username FROM `users` WHERE `username` = '" + post.username + "' AND `password` = '" + post.password + "'";
    connection.query(query, function (err, results) {
        if (err) throw err;

        var result = {
            userId: results[0].userId,
            username: results[0].username
        };
        res.render("index", { result });
    });
});

router.get("/update/:userId", function (req, res) {
    var query = "SELECT * from `users` WHERE userId = '" + req.params.userId + "'";
    connection.query(query, function (err, results) {
        if(err) throw err;

        var result = {
            userId: results[0].userId,
            username: results[0].username,
            email: results[0].email,
            password: results[0].password
        };

        res.render("profile", { result });
    });
});

router.post("/update/:userId", function (req, res) {
    var post = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    // insert to user table
    var sqlQuery = "UPDATE users SET ? WHERE userId = '" + req.params.userId + "'";
    connection.query(sqlQuery, post, function (err) {
        if (err) throw err;

        // I hate to do this but I don't know what to do smarter
        var query = "SELECT userId, username FROM `users` WHERE `userId` = '" + req.params.userId + "'";
        connection.query(query, function (err, results) {
            if (err) throw err;

            var result = {
                userId: results[0].userId,
                username: results[0].username
            };
            res.render("index", { result });
        });
    });
});

router.get("/delete/:userId", function (req, res) {
    var query = "DELETe FROM users WHERE `userId` = '" + req.params.userId + "'";
    connection.query(query, function (err) {
        if (err) throw err;
        res.redirect("/");
    });
});

module.exports = router;
