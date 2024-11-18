const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Owners"
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            require: true
        },
        registerationNumber: {
            type: String,
            require: true
        },
        kmsDriven: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Vehicle = mongoose.model("Vehicles", vehicleSchema);
module.exports = Vehicle;
