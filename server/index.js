const port = 5000
const express = require('express')
const cors = require('cors')
const app = express()
const configRoute = require('./util/global/configRoute')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sanketMistry:RUcKBBwkwjMGc8ID@clusterio.7tutlrm.mongodb.net/Exercise_Guru?retryWrites=true&w=majority&appName=ClusterIO')
    .then(()=>console.log('mongodb connected'))
    .catch(err=>console.log(err))

app.use(cors(corsOptions))
// Allows to send json data from client to server
app.use(express.json())

app.listen(port,'localhost', () => {
    console.log('Server started on port :', port)
})

configRoute(app)
