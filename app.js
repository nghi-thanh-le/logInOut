var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    signup = require("./routes/signup"),
    login = require("./routes/login");


//middle ware section
var app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
// app.VERB section

/* SIGNUP */
app.use("/", signup);
/* LOGIN */
app.use("/login", login);
/* UPDATE */
/*
app.get("/update/:userId", function (req, res) {
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

app.post("/update/:userId", function (req, res) {
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
}); */

/* USER interface */
/*
app.get("/user", function (req, res) {
    res.render("index");
});
*/
/* ADMIN */
/*
app.get("/admin", function (req, res) {

});
*/
// server
app.listen(3000, function() {
    console.log("Server listen to port 3000");
});
