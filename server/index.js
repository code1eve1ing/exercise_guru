const port = 5000
const express = require('express')
const cors = require('cors')
const app = express()
const configRoute = require('./util/global/configRoute')
require('dotenv').config();
const mongoose = require('mongoose')
console.log('Client origin :', process.env.client)
const corsOptions = {
    origin: process.env.client,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}

mongoose.connect(process.env.mongo_url)
    .then(()=>console.log('mongodb connected'))
    .catch(err=>console.log(err))

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
// Allows to send json data from client to server
app.use(express.json())

app.listen(port,'localhost', () => {
    console.log('Server started on port :', port)
})

configRoute(app)
