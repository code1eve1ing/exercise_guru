const port = 5000
const express = require('express')
const cors = require('cors')
const app = express()
const configRoute = require('./util/global/configRoute')
require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_url)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))


// Allows to send json data from client to server
app.use(express.json())
app.use(cors({
    origin: 'https://exercise-guru.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 204
}));
app.options('*', cors(corsOptions));
app.listen(port, () => {
    console.log('Server started on port :', port)
})

configRoute(app)
