const ServiceType = require("../models/serviceType.model");

module.exports.createServiceType = async (req, res) => {
    try {
        const existsData = await ServiceType.findOne({ name: req.body.name });
        if (existsData)
            return res.status(200).json({
                status: false,
                message: "ServiceType already exists!"
            });
        const serviceTypeData = {
            name: req.body.name,
            description: req.body.description || null
        };
        const result = await ServiceType.create(serviceTypeData);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "ServiceType created successfully",
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

module.exports.getAllServiceType = async (req, res) => {
    try {
        const response = await ServiceType.find({});
        if (response) {
            return res.status(200).json({
                message: "ServiceType fetched successfully",
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
    const id = req.params.id;
    console.log({ id });
    try {
        const result = await ServiceType.findOne({ _id: id });
        if (result) {
            return res.status(200).json({
                message: "ServiceType fetched successfully",
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

module.exports.updateServiceType = async (req, res) => {
    const id = req.params.id;
    console.log({ id });
    try {
        const updatedData = await ServiceType.findByIdAndUpdate(
            { _id: id },
            { $set: { ...req.body } },
            { new: true }
        );
        if (updatedData) {
            return res.status(200).json({
                message: "ServiceType updated successfully",
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
module.exports.deleteServiceType = async (req, res) => {
    const id = req.params.id;
    console.log({ id });
    try {
        const deletedData = await ServiceType.findByIdAndDelete({ _id: id });
        if (deletedData) {
            return res.status(200).json({
                message: "ServiceType deleted successfully",
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
