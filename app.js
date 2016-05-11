var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    signup = require("./routes/signup"),
    login = require("./routes/login"),
    update = require("./routes/update");

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
app.use("/update", update);

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
