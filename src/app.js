require("dotenv").config();

import "reflect-metadata"
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

import routes from "./routes"
import { createDbConnection } from "./db"
import DbService from "./services/DbService"

const app = express();


// Middlewares

app.use(helmet()); // Secure http headers
app.use(cors());
app.use(express.json()); // Parse request body
app.use(morgan("dev")); // HTTP Logging

const connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
  port     : process.env.SQLPORT
  });

// Routes
app.use(routes);


createDbConnection().then(conn => DbService.init(conn));

export default app;