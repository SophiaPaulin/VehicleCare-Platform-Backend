const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");
const mongodbAtlasUrl = config.get("mongodbAtlasUrl");
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbAtlasUrl);
        console.log("Mongodb Connected...");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
