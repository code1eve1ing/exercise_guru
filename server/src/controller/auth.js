const express = require('express')
const authRouter = express.Router()
const UserModel = require('../model/user')
const v = require('valibot')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { validate } = require('../middleware/validator')
const Schedule = require('../model/schedule')
const schedule = require('../model/schedule')
const { successResponse } = require('../../util/global/response')

const signupSchema = v.object({
   name: v.string(),
   email: v.string([v.email()]),
   password: v.string([v.minLength(6)])
})

authRouter.post('/signup', validate(signupSchema, false), async (req, res) => {
   try {
      const { name, email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (user) return res.status(409).send({ message: 'user already exists' })

      // Generate secured password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      // Save user details
      const { _id, } = await UserModel.create({ name, email, hash })

      // Generate JWT that expires after 1 month
      const token = jwt.sign({ _id, email, name }, 'SECRET_KEY', { expiresIn: 3600 * 720 })
      successResponse(res, { token, user: { name, email, id: _id } })
      return
   } catch (err) {
      errorResponse(res, err)
      return
   }
})

const loginSchema = v.object({
   email: v.string([v.email()]),
   password: v.string([v.minLength(6)])
})

authRouter.post('/login', validate(loginSchema, false), async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (!user) return res.status(404).send({ message: 'User Not Found' })

      // Compare password with hash
      const passwordMatch = bcrypt.compareSync(password, user.hash)
      if (!passwordMatch) return res.status(401).send({ message: 'Anauthorized Access' })
      // Generate JWT that expires after 1 month
      const token = jwt.sign({ _id: user._id, email, name: user.name }, 'SECRET_KEY', { expiresIn: 3600 * 720 })

      const userData = { name: user.name, email: user.email, id: user._id }
      const schedules = await Schedule.find({ user_id: user._id })
      successResponse(res, { success: true, token, user: userData, schedules })
   } catch (err) {
      errorResponse(res, err)
      return
   }
})

authRouter.get('/stats', async (req, res) => {
   try {
      const token = req.get('Authorization')
      if (token) {
         const user = jwt.verify(token, 'SECRET_KEY')
         const schedules = await Schedule.find({ user_id: user._id })
         successResponse(res, { isAuthenticated: true, user: user, schedules })
      } else {
         successResponse(res, { isAuthenticated: false })
      }
      return
   } catch (err) {
      errorResponse(res, err)
      return
   }
})
module.exports = authRouter