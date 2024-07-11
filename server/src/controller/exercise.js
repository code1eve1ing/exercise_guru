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
    const { search } = req.query

    let query = [
      {
        $project: {
          list: { $slice: ["$list", 20] }
        }
      }
    ]
    if (search) {
      query = [
        {
          $project: {
            list: {
              $filter: {
                input: "$list",
                as: "list",
                cond: { $regexMatch: { input: "$$list.name", regex: new RegExp(search, 'i') } }
              }
            }
          }
        }
        , ...query
      ]
    }


    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      params: {
        limit: '2000',
        offset: '0'
      },
      headers: {
        'x-rapidapi-key': '667ec46141msh73f84530c4fb3a4p15f216jsn1e07fac1b0b7',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      await ThirdPartyExercise.findOneAndUpdate({_id:'66515e5feb084ab6f49f5631'}, {list: response.data})
    } catch (error) {
      console.error(error);
    }

    const exercises = await ThirdPartyExercise.aggregate(query)
    res.send(exercises[0].list).end()
  } catch (error) {
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
    res.send(schedule).end()
  } catch (error) {
    res.send(error)
  }

}))

module.exports = exerciseRouter