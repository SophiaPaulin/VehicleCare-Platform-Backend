const Router = require("express").Router();
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleware = require("../middleware/middleware");

Router.post("/create", authMiddleware, vehicleController.createVehicle);
Router.get("/getAllVehicle", authMiddleware, vehicleController.getAllVehicle);
Router.get("/getById/:id", authMiddleware, vehicleController.getById);
Router.get("/getByOwner/:id", authMiddleware, vehicleController.getVehicleByOwnerId);
Router.put("/update/:id", authMiddleware, vehicleController.updateVehicle);
Router.delete("/:id", authMiddleware, vehicleController.deleteVehicle);

module.exports = Router;
