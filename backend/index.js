const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const path = require('path')
const app = express()

const port = process.env.PORT || 5000
const connectDB = require('./config/db')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    })
app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))

connectDB()



app.listen(port, () => console.log(`server started on port ${port}`))