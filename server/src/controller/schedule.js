const express = require('express')
const scheduleRouter = express.Router()
const v = require('valibot')
const { string, array, object } = require('valibot')
const Schedule = require('../model/schedule')
const { validate } = require('../middleware/validator')
const { successResponse, errorResponse } = require('../../util/global/response')

const scheduleSchema = object({
    name: string(),
    exercise: object({
        bodyPart: string(),
        equipment: string(),
        gifUrl: string(),
        id: string(),
        name: string(),
        target: string(),
        secondaryMuscles: array(string()),
        instructions: array(string())
    })
})

scheduleRouter.post('/', validate(scheduleSchema), (async (req, res) => {
    try {
        const user = req.user
        const { name, exercise } = req.body
        const schedule = await Schedule.create({ name, exercises: [exercise], user_id: user._id })
        successResponse(res, schedule)
        return
    } catch (err) {
        errorResponse(res, err)
        return
    }
}))

const addExerciseSchema = object({
    schedule_id: string(),
    exercise: object({
        bodyPart: string(),
        equipment: string(),
        gifUrl: string(),
        id: string(),
        name: string(),
        target: string(),
        secondaryMuscles: array(string()),
        instructions: array(string())
    })
})

scheduleRouter.post('/exercise', validate(addExerciseSchema), (async (req, res) => {
    try {
        const user = req.user
        const { schedule_id, exercise } = req.body
        const updatedSchedule = await Schedule.findOneAndUpdate({ _id: schedule_id }, { $push: { exercises: exercise } }, { new: true })
        successResponse(res, updatedSchedule)
        return
    } catch (err) {
        errorResponse(res, err)
        return
    }
}))

scheduleRouter.post('/exercise/interval', (async (req, res) => {
    try {
        const { scheduleId, exerciseId, key, value } = req.body
        const updateObject = {}
        if (value) updateObject[`exercises.$.interval.${key}`] = value
        updateObject['exercises.$.interval.preference'] = key

        const updatedSchedule = await Schedule.findOneAndUpdate(
            { _id: scheduleId, 'exercises.id': exerciseId },
            { $set: updateObject },
            { new: true }
        )
        successResponse(res, updatedSchedule)
        return
    } catch (err) {
        errorResponse(res, err)
        return
    }
}))

module.exports = scheduleRouter