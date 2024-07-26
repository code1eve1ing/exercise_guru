const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const v = require('valibot')
const { errorResponse } = require('../../util/global/response')

const validate = (schema = {}, validateJWT = true) => (req, res, next) => {
    try {
        // Validate JWT
        if (validateJWT) {
            const token = req.get('Authorization')
            const user = jwt.verify(token, 'SECRET_KEY')
            req.user = user
        }

        // Validate payload
        if (!_.isEmpty(schema)) {
            const result = v.safeParse(schema, req.body)
            if (!result.success) return res.send(result.issues).end()
        }
        next()
    } catch (err) {
        errorResponse(res, err)
        return
    }
}

module.exports = { validate }