require("dotenv").config();

import express from "express"
import morgan from "morgan"

import routes from "./routes"

const app = express();


// Middlewares
app.use(express.json());
app.use(morgan("dev"));


// Routes
app.use(routes);


app.post("/newsletter", (req, res) => {
  /*const queryCheck = 'SELECT email FROM accounts WHERE email = \'' + req.body.email + '\'';
  const queryInsert = 'INSERT INTO accounts (Nome, Cognome, Email) VALUES (\'' + req.body.name + '\',\'' + req.body.surname + '\',\'' + req.body.email + '\')';

  console.log(queryInsert);

  connection.query(queryCheck, function(err, rows, fields) 
  {
    console.log(rows);
    if (err) throw err;
    if (rows.length) res.status(400).send("Email gi� utilizzata!!!");
    else
    {        
      console.log(queryInsert);

      connection.query(queryInsert, function(err, rows, fields)
      {
        if(err) throw err;
        else res.status(200).send("Contatto inserito correttamente!");
      });
    }
  });*/

});


export default app;