const Router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middleware/middleware");

Router.post("/create", authMiddleware, appointmentController.createAppointment);
Router.get("/getAllAppointment", appointmentController.getAllAppointment);
Router.get("/getById/:id", authMiddleware, appointmentController.getById);
Router.put("/update/:id", authMiddleware, appointmentController.updateAppintment);
Router.delete("/:id", authMiddleware, appointmentController.deleteAppointment);
Router.put("/update/status/:id", authMiddleware, appointmentController.updateServiceStatus);
Router.get("/getByStatus", authMiddleware, appointmentController.getByStatus);

module.exports = Router;
