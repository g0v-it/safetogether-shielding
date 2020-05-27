module.exports = (app) => {
    app.use(require("../middleware/Auth").apply);
    app.use(require("../middleware/Cors").apply);
}