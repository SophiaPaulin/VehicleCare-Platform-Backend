const Vehicle = require("../models/vehicle.model");
const Owner = require("../models/owner.model");

module.exports.createVehicle = async (req, res) => {
    try {
        const vehicleData = {
            ownerId: req.body.ownerId,
            model: req.body.model,
            year: req.body.year,
            registerationNumber: req.body.registerationNumber,
            kmsDriven: req.body.kmsDriven
        };
        const response = await Vehicle.create(vehicleData);
        if (response) {
            return res.status(201).json({
                message: "Vehicle created successfully",
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
            error: error.message,
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.getAllVehicle = async (req, res) => {
    try {
        const response = await Vehicle.find({});
        // console.log({ response });
        if (response) {
            let datas = [];
            for (let index = 0; index < response.length; index++) {
                const item = response[index];
                const ownerData = await Owner.findOne({ _id: item.ownerId });
                const ownerName = ownerData ? ownerData.firstName + " " + ownerData.lastName : "";
                datas.push({
                    _id: item._id,
                    model: item.model,
                    registerationNumber: item.registerationNumber,
                    year: item.year,
                    kmsDriven: item.kmsDriven,
                    ownerName: ownerName || {}
                });
            }
            return res.status(200).json({
                message: "Vehicle featched successfully",
                result: datas,
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Something went worng!",
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

module.exports.getVehicleByOwnerId = async (req, res) => {
    const ownerId = req.params.id;
    console.log({ ownerId });
    try {
        const result = await Vehicle.find({ ownerId });
        const ownerData = await Owner.findById({ _id: ownerId });
        console.log({ result });
        if (result && ownerData) {
            return res.status(200).json({
                status: true,
                message: "Data fetched successfully",
                result: { result, ownerData }
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            error,
            message: " Internal server error",
            status: false
        });
    }
};

module.exports.getById = async (req, res) => {
    const vehicleId = req.params.id;
    console.log({ vehicleId });
    try {
        const response = await Vehicle.findOne({ _id: vehicleId });
        if (response) {
            return res.status(200).json({
                message: "Vehicle fetched successfully",
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
            message: " Internal server error",
            status: false
        });
    }
};
module.exports.updateVehicle = async (req, res) => {
    const vehicleId = req.params.id;
    console.log({ vehicleId });
    try {
        const result = await Vehicle.findByIdAndUpdate(
            { _id: vehicleId },
            { $set: { ...req.body } },
            { new: true }
        );
        if (result) {
            return res.status(200).json({
                message: "Vehicle updated successfully",
                result,
                status: false
            });
        } else {
            return res.status(404).json({
                message: "Something went wrong!",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
};

module.exports.deleteVehicle = async (req, res) => {
    const vehicleId = req.params.id;
    console.log({ vehicleId });
    try {
        const deleteData = await Vehicle.findByIdAndDelete({ _id: vehicleId });
        if (deleteData) {
            return res.status(200).json({
                message: "Vehicle deleted succsessfully",
                status: true
            });
        } else {
            return res.status(404).json({
                message: "Somthing went wrong!",
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
