//middleware are functions that execute during the request response cycle
const errorHandler = (err, req, res, next) => {
    //this would get the status code that was set
    // if not it would make it 500 which is a server erroe
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export default errorHandler 