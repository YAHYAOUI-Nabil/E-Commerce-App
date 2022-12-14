const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product') 
const cartRoutes = require('./routes/cart') 
const orderRoutes = require('./routes/order') 
const paymentRoutes = require('./routes/stripe') 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    })
app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))
app.use(cors())

connectDB()

app.use('/bazar/auth', authRoutes)
app.use('/bazar/users', userRoutes)
app.use('/bazar/products', productRoutes)
app.use('/bazar/carts', cartRoutes)
app.use('/bazar/orders', orderRoutes)
app.use('/bazar/payment', paymentRoutes)

app.listen(port, () => console.log(`server started on port ${port}`))