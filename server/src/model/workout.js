const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    bodyPart: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true,
    },
    gifUrl: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    secondaryMuscles: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model('workout', workoutSchema);