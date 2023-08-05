require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const customerRoutes = require('./routes/customer')
const staffRoutes = require('./routes/staff')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/staff', staffRoutes)

//connect to db on mongodb atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })