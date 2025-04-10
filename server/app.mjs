import express from 'express'
import routes from './src/v1/routes/index.mjs'
import connectDB from './db/connectDB.mjs'
import middleware from './middleware/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'

const app = express()

connectDB()

middleware(app)

app.use('/api/v1/', routes)

errorHandler(app)

export default app
