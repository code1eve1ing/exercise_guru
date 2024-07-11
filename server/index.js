const port = 5000
const express = require('express')
const cors = require('cors')
const app = express()
const configRoute = require('./util/global/configRoute')
require('dotenv').config();
const mongoose = require('mongoose')


app.use(cors())

// Allows to send json data from client to server
app.use(express.json())

mongoose.connect(process.env.mongo_url)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

app.listen(process.env.port, () => {
    console.log('Server started on port :', process.env.port)
})

app.get('/', (req, res) => {   
    res.send('Hello, world').end()
});

configRoute(app)
