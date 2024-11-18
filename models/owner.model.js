const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        }
    },
    {
        timetamps: true
    }
);

const Owner = mongoose.model("Owners", ownerSchema);
module.exports = Owner;
