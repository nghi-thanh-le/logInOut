var express = require("express"),
    connection = require("../database/mysqlDatabase");
var router = express.Router();

connection.connect(function (err) {
    if(err) throw err;
    console.log("Connect to database");
});

router.get("/check/:username/:password", function (req, res) {
    var post = {
        username: req.params.username,
        password: req.params.password
    };

    // get from database
    var query = "SELECT username, password FROM `users` WHERE `username` = '" + post.username + "' OR `password` = '" + post.password + "'";
    connection.query(query, function (err, results) {
        if (err) throw err;
        if(results.length === 0) {
            res.json({
                "existed": false,
                "message": "This user does not exist, Please sign up"
            });
        } else {
            if(post.password != results[0].password && post.username == results[0].username) {
                res.json({
                    "existed": true,
                    "message": "Username is registed and incorrect password"
                })
            } else {
                res.json({
                    "existed": true,
                    "message": "Username and password are registed! You choose another!"
                });
            }
        }
    });
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

        res.redirect("/login");
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

    if(post.username === "admin" && post.password === "admin") {
        var query = "SELECT * FROM `users`";
        var result = [];
        connection.query(query, function (err, results) {
            for(var i = 1; i < results.length; i++) {
                result.push(results[i]);
            }
            res.render("admin", { result });
        });
    } else {
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
    }
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

        // I hate to do this but I don't know how to do smarter or better solution
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
    var query = "DELETE FROM users WHERE `userId` = '" + req.params.userId + "'";
    connection.query(query, function (err) {
        if (err) throw err;
        res.redirect("/");
    });
});

module.exports = router;
