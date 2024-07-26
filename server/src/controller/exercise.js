const express = require('express')
const axios = require('axios');
const { generateHTML } = require('../../util/exercise/exercise');
const { validate } = require('../middleware/validator');
const exerciseRouter = express.Router()
const v = require('valibot')
const { string, array, object } = require('valibot')
const Schedule = require('../model/schedule');
const ThirdPartyExercise = require('../model/thirdPartyExercise');
const Workout = require('../model/workout');
const path = require('path');
const fs = require('fs');
const { successResponse } = require('../../util/global/response');


exerciseRouter.get('/', async (req, res) => {
  try {
    const { search } = req.query
    let query = [{ $limit: 12 }]

    if (search) {
      // TODO: add search query
    }

    const exercises = await Workout.aggregate(query)
    successResponse(res, exercises)
    return
  } catch (err) {
    errorResponse(res, err)
    return
  }
})

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

exerciseRouter.post('/schedule', validate(scheduleSchema), (async (req, res) => {
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

module.exports = exerciseRouter