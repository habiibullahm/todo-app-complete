const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGO_DB_URI
const mongoOption = {
    useNewUrlParser : true,
};

module.exports = function () {
    try {
        mongoose.connect(mongoURI, mongoOption);
        console.log("Connected to MongoDB!");
    } catch (err){
        console.error(
            `Connection error : ${err.stack} on Worker process : ${process.pid}`
        )
        process.exit(1);       
    }
}