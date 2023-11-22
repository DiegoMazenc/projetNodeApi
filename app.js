// get the client
const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "poo_mvc_bdd",
});

const displayResults = (request, response) => {
  const limit = !isNaN(request.query.limit) ? parseInt(request.query.limit) : 3;
  const page = !isNaN(request.query.page)
    ? parseInt(request.query.page - 1) * limit
    : 0;
  // simple query
  connection.query(
    "SELECT * FROM `picture` ORDER BY id DESC LIMIT " + page + "," + limit,
    function (err, results, fields) {
      response.send(results);
      console.log(err);
    }
  );
};

app.get("/api", displayResults);
app.post("/api", (request, response) => {

  const author = request.body.author;
  const src = request.body.src;
  const title = request.body.title;
  const description = request.body.description;

  connection.query(
    "INSERT INTO `picture` (`title`,`description`,`src`,`author`) VALUES(?,?,?,?)",
    [title, description, src, author],
    function (err, results, fields) {
    //   response.send(results);
    //   console.log(err);
      response.redirect('/');
    }
  );
});
