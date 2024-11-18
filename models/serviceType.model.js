const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const ServiceType = mongoose.model("ServiceType", serviceTypeSchema);
module.exports = ServiceType;
