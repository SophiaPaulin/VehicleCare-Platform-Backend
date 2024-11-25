const Appointment = require("../models/appointment.model");
const Owner = require("../models/owner.model");
const Technician = require("../models/technician.model");
const Vehicle = require("../models/vehicle.model");

module.exports.createAppointment = async (req, res) => {
    try {
        const appointmentData = {
            vehicleId: req.body.vehicleId,
            technicianId: req.body.technicianId,
            appointmentDate: req.body.appointmentDate || new Date(),
            appointmentTime: req.body.appointmentTime || new Date(),
            status: req.body.status || "Scheduled"
        };
        console.log("Appointment Data to Save:", appointmentData);
        
        const response = await Appointment.create(appointmentData);
        if (response) {
            return res.status(200).json({
                message: "Appointment created succesfully",
                result: response,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.getAllAppointment = async (req, res) => {
    try {
        const result = await Appointment.find({});
        if (result.length > 0) {
            let appointmentDatas = [];
            for (let index = 0; index < result.length; index++) {
                const item = result[index];
                const vechicleData = await Vehicle.findById({ _id: item.vehicleId });
                const technicianData = await Technician.findById({ _id: item.technicianId });
                const ownerData = await Owner.findById({
                    _id: vechicleData.ownerId
                });
                // const vechicleData = await Vehicle.findOne({ _id: item.vehicleId });
                appointmentDatas.push({
                    appointmentDate: item.appointmentDate,
                    appointmentTime: item.appointmentTime,
                    _id: item._id,
                    status: item.status,
                    vechicleData: vechicleData || {},
                    // technicianData: technicianData || {},
                    technicianName: technicianData.name,
                    technicianMobile: technicianData.mobile,
                    technicianId: technicianData._id,
                    ownerName: ownerData.firstName + " " + ownerData.lastName || null,
                    ownerMobile: ownerData.phoneNumber || null
                });
            }
            return res.status(200).json({
                message: "Appointent fetched successfully",
                // result,
                appointmentDatas,
                status: true
            });
        } else {
            return res.status(404).json({
                message: " Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};
module.exports.getById = async (req, res) => {
    const appointmentId = req.params.id;
    console.log({ appointmentId });
    try {
        const result = await Appointment.findOne({ _id: appointmentId });
        if (result) {
            const vechicleData = await Vehicle.findById({ _id: result.vehicleId });
            const technicianData = await Technician.findById({ _id: result.technicianId });
            const ownerData = await Owner.findById({ _id: vechicleData.ownerId });
            return res.status(200).json({
                message: " Appointment fetched successfully",
                appointmentDate: result.appointmentDate,
                appointmentTime: result.appointmentTime,
                status: result.status,
                vechicleData: vechicleData || {},
                technicianData: technicianData || {},
                ownerData: ownerData || {},
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.updateAppintment = async (req, res) => {
    const appointmentId = req.params.id;
    console.log({ appointmentId });
    try {
        const updateAppointmentData = {
            vehicleId: req.body.vehicleId,
            technicianId: req.body.technicianId,
            appointmentDate: req.body.appointmentDate || new Date(),
            appointmentTime: req.body.appointmentTime || new Date(),
            status: req.body.status
        };
        const result = await Appointment.findOneAndUpdate(
            { _id: appointmentId },
            { $set: updateAppointmentData },
            { new: true }
        );
        if (result) {
            return res.status(200).json({
                message: " Appointment updated successfully",
                result,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};
module.exports.deleteAppointment = async (req, res) => {
    const appointmentId = req.params.id;
    console.log({ appointmentIdId });
    try {
        const deletedData = await Appointment.findByIdAndDelete({ _id: appointmentId });
        if (deletedData) {
            return res.status(200).json({
                message: "Appointment deleted successfully",
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.updateServiceStatus = async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const updateStatus = await Appointment.updateOne(
            { _id: appointmentId },
            { $set: { status: req.body.status } }
        );
        if (updateStatus) {
            // const updatedData = await Appointment.findById({ _id, appointmentId });
            return res.status(200).json({
                message: "Status updated successfully",
                status: true,
                result: updateStatus
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.getByStatus = async (req, res) => {
    const status = req.query.status;
    console.log({ status });
    try {
        const result = await Appointment.find({ status: req.query.status });
        if (result.length > 0) {
            let appointmentDatas = [];
            for (let index = 0; index < result.length; index++) {
                const item = result[index];
                const vechicleData = await Vehicle.findById({ _id: item.vehicleId });
                const technicianData = await Technician.findById({ _id: item.technicianId });
                const ownerData = await Owner.findOne({ _id: vechicleData.ownerId });
                appointmentDatas.push({
                    appointmentDate: item.appointmentDate,
                    appointmentTime: item.appointmentTime,
                    status: item.status,
                    vechicleData: vechicleData || {},
                    technicianData: technicianData || {},
                    ownerData: ownerData || {}
                });
            }
            // const updatedData = await Appointment.findById({ _id, appointmentId });
            return res.status(200).json({
                message: "Data fetched successfully",
                status: true,
                result: appointmentDatas
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Internal server error",
            status: false
        });
    }
};
