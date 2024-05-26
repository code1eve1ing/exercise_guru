const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: {
        type: Array,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('schedules', scheduleSchema);