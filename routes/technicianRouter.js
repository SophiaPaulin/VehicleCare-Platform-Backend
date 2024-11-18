const Router = require("express").Router();
const technicianController = require("../controllers/technician.controller");
const authMiddleware = require("../middleware/middleware");

Router.post("/create", authMiddleware, technicianController.createTechnician);
Router.get("/getAllTechnician", authMiddleware, technicianController.getAllTechnician);
Router.get("/getById/:id", authMiddleware, technicianController.getById);
Router.put("/update/:id", authMiddleware, technicianController.updateTechnician);
Router.delete("/:id", authMiddleware, technicianController.deleteTechnician);

module.exports = Router;
