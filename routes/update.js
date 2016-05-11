var express = require("express"),
    router = express.Router(),
    path = require("path"),
    connection = require("../database/mysqlDatabase.js");

connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected to data from update site!");
});

router.get("/:userId", function (req, res) {
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
    })
});

router.post("/", function (req, res) {
    var post = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    // insert to user table
    var sqlQuery = "UPDATE users SET ? WHERE userId = '" + req.params.userId + "'";
    query = connection.query(sqlQuery, post, function (err) {
        if (err) throw err;

        res.redirect("/user");
    });
});

module.exports = router;
