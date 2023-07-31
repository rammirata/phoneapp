const badRequest = (res, message=null) => {
    return res.status(400).json({message: message});
}

const serverError = (res, message=null) => {
    return res.status(500).json({message: message});
}

const success = (res, message = null, data = null) => {
    return res.status(200).json({ message: message, ...data });
}

module.exports = {
    badRequest,
    success,
    serverError
}