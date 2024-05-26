const exerciseRouter = require("../../src/controller/exercise")
const authRouter = require("../../src/controller/auth")
const scheduleRouter = require("../../src/controller/schedule")

const configRoute = (app) => {
    app.use('/auth', authRouter)
    app.use('/exercise', exerciseRouter)
    app.use('/schedule', scheduleRouter)
}

module.exports = configRoute