const express = require('express')
const axios = require('axios');
const { generateHTML } = require('../../util/exercise/exercise');
const { validate } = require('../middleware/validator');
const exerciseRouter = express.Router()
const v = require('valibot')
const { string, array, object } = require('valibot')
const Schedule = require('../model/schedule');
const ThirdPartyExercise = require('../model/thirdPartyExercise');

exerciseRouter.get('/', async (req, res) => {
  try {
    const exercises = await ThirdPartyExercise.findOne({})
      res.send(exercises.list.slice(10, 30))
    res.end()
  } catch (error) {
    console.log(error)
    res.send(error)
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

    res.send(schedule)
    return

  } catch (error) {
    res.send(error)
  }

}))

module.exports = exerciseRouter