const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        mobile: {
            type: Number,
            require: true
        }
    },
    {
        timetamps: true
    }
);

const Technician = mongoose.model("Technicians", technicianSchema);
module.exports = Technician;
