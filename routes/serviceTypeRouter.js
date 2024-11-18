const Router = require("express").Router();
const serviceTypeController = require("../controllers/serviceType.controller");
const authMiddleware = require("../middleware/middleware");

Router.post("/create", authMiddleware, serviceTypeController.createServiceType);
Router.get("/getAllServiceType", authMiddleware, serviceTypeController.getAllServiceType);
Router.get("/getById/:id", authMiddleware, serviceTypeController.getById);
Router.put("/update/:id", authMiddleware, serviceTypeController.updateServiceType);
Router.delete("/:id", authMiddleware, serviceTypeController.deleteServiceType);

module.exports = Router;
