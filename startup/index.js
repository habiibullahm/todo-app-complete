module.exports = function (app) {
    require("./config")();
    require("./cors")(app);
    require("./logger")(app);
    require("./parser")(app)
    require("./db")()
    require("./routes")(app)
}