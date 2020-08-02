const morgan = require('morgan');
require('dotenv').config();
var express = require('express');
var app = express();

app.use(express.json());
app.use(morgan("dev"));

const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
  });

connection.connect();

app.post("/newsletter", (req, res) => {
  const queryCheck = 'SELECT email FROM accounts WHERE email = \'' + req.body.email + '\'';
  const queryInsert = 'INSERT INTO accounts (Nome, Cognome, Email) VALUES (\'' + req.body.name + '\',\'' + req.body.surname + '\',\'' + req.body.email + '\')';

  console.log(queryInsert);

  connection.query(queryCheck, function(err, rows, fields) 
  {
    console.log(rows);
    if (err) throw err;
    if (rows.length) res.status(400).send("Email già utilizzata!!!");
    else
    {        
      console.log(queryInsert);

      connection.query(queryInsert, function(err, rows, fields)
      {
        if(err) throw err;
        else res.status(200).send("Contatto inserito correttamente!");
      });
    }
  });
});

app.listen(process.env.PORT, function ()
{
  console.log("listening on " + process.env.PORT);

});