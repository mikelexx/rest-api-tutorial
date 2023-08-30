// to load environment variables from env file
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//connect to database                  databaseName
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
//callback to be exectuted only once soon as database is connected
db.once('open',()=>console.log("connected to database"))
const app = express()
// set up server to accept json
app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
// localhost:3000/subscribers will lead to the file url above
app.use('/subscribers',subscribersRouter)
app.listen(3000,()=>console.log("server started"))