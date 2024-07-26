const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const configRoute = require('./util/global/configRoute')
require('dotenv').config();
const app = express()

mongoose.connect(process.env.mongo_url)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

app.use(cors())
app.use(express.json())
configRoute(app)

app.listen(process.env.port, () => {
    console.log('Server started on port :', process.env.port)
})

