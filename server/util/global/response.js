successResponse = (res, data)=> {
    res.status(200).send(data).end()
}

errorResponse = (res, err)=> {
    res.status(500).send(err).end()
}

module.exports = { successResponse, errorResponse }