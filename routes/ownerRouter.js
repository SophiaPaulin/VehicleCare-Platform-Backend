const Router = require("express").Router();
const ownerController = require("../controllers/owner.controller");
const authMiddleware = require("../middleware/middleware");

Router.post("/create", authMiddleware, ownerController.createOwner);
Router.get("/getAllOwner", authMiddleware, ownerController.getAllOwner);
Router.get("/getById/:id", authMiddleware, ownerController.getById);
Router.put("/update/:id", authMiddleware, ownerController.updateOwner);
Router.delete("/:id", authMiddleware, ownerController.deleteOwner);

module.exports = Router;
