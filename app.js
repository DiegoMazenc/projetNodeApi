// get the client
const mysql = require('mysql2');
const express = require('express');
const app = express();

app.use('/',express.static('public'));

app.listen(3000);

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'my_mvc_bdd'
});

const displayResults = (request,response) => {
const limit = !isNaN(request.query.limit) ? parseInt(request.query.limit) : 3;
const page = !isNaN(request.query.page) ? parseInt(request.query.page-1)*limit : 0;
    // simple query
connection.query(
    'SELECT * FROM `picture` ORDER BY id ASC LIMIT '+ page+ ',' + limit,
    function(err, results, fields) {
    response.send(results);
    console.log(err);
    }
  );
}



app.get('/api', displayResults);

