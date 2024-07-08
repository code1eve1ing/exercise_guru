const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thirdPartyExercise = new Schema({
    list: {
        type: Array,
        required: true
    },
    list_v2: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('exercises', thirdPartyExercise);