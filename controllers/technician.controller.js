const Technician = require("../models/technician.model");

module.exports.createTechnician = async (req, res) => {
    try {
        const existsData = await Technician.findOne({ name: req.body.name });
        if (existsData)
            return res.status(200).json({
                status: false,
                message: "Technician name already exists!"
            });
        const technicianData = {
            name: req.body.name,
            mobile: req.body.mobile
        };
        const result = await Technician.create(technicianData);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Technician created successfully",
                result
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
            message: " Internal server error",
            status: false
        });
    }
};

module.exports.getAllTechnician = async (req, res) => {
    try {
        const response = await Technician.find({});
        if (response) {
            return res.status(200).json({
                message: "Technician fetched successfully",
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
module.exports.getById = async (req, res) => {
    const technicianId = req.params.id;
    console.log({ technicianId });
    try {
        const result = await Technician.findOne({ _id: technicianId });
        if (result) {
            return res.status(200).json({
                message: "Technician fetched successfully",
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
module.exports.updateTechnician = async (req, res) => {
    const technicianId = req.params.id;
    console.log({ technicianId });
    try {
        const updatedData = await Technician.findByIdAndUpdate(
            { _id: technicianId },
            { $set: { ...req.body } },
            { new: true }
        );
        if (updatedData) {
            return res.status(200).json({
                message: "Technician updated successfully",
                result: updatedData,
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
module.exports.deleteTechnician = async (req, res) => {
    const technicianId = req.params.id;
    console.log({ technicianId });
    try {
        const deletedData = await Technician.findByIdAndDelete({ _id: technicianId });
        if (deletedData) {
            return res.status(200).json({
                message: "Technician deleted successfully",
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
