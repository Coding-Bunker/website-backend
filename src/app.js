import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import * as bodyParser from 'body-parser'

import routes from './routes'
import { createDbConnection } from './db'
import DbService from './services/DbService'

const app = express()

// Middlewares

app.use(helmet()) // Secure http headers
app.use(cors())

app.use(bodyParser.json({ limit: '200kb' })) // Parse request body
app.use(bodyParser.urlencoded()) // Parse form encoded request

app.use(morgan('dev')) // HTTP Logging

// Routes
app.use(routes)

createDbConnection().then(conn => DbService.init(conn))

export default app