var express = require("express"),
    router = express.Router(),
    path = require("path"),
    connection = require("../database/mysqlDatabase.js");

router.get("/", function (req, res) {
    res.render("login");
});

router.post("/", function (req, res) {
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
        console.log(result);
        res.render("index", { result });
    });
});

module.exports = router;
