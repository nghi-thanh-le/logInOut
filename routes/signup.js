var express = require("express"),
    path = require("path"),
    connection = require("../database/mysqlDatabase.js");

var resultFromInsert = {};
var router = express.Router();
connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected to data from sign up site!");
})

router.get("/", function (req, res) {
    res.render("signup");
});

router.post("/signup", function (req, res) {
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

router.get("/profile", function (req, res) {

});

module.exports = router;
