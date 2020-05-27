module.exports = (app) => {
    app.use('/login', require("../routes/login"))
}