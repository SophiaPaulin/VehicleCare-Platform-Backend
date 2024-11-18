const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vehicle"
        },
        technicianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technician"
        },
        serviceTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceType"
        },
        appointmentDate: {
            type: Date,
            default: new Date()
        },
        appointmentTime: {
            type: Date,
            default: new Date()
        },
        status: {
            type: String,
            require: true,
            enum: ["Scheduled", "Completed", "Delivered"],
            default: "Scheduled"
        }
    },
    {
        timetamps: true
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
