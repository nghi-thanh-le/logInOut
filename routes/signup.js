var express = require("express"),
    router = express.Router(),
    path = require("path"),
    connection = require("../database/mysqlDatabase.js");

router.get("/", function (req, res) {
    res.render("signup");
});

router.post("/", function (req, res, next) {
    // get the form submit file
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // insert to user table
    connection.query("INSERT INTO users SET ?", post, function (err, result) {
        if (err) throw err;
        res.redirect("/user");
    });
});

module.exports = router;
