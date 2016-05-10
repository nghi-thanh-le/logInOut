var mysql = require("mysql");

// connect to database section
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logInOut"
});

module.exports = connection;
