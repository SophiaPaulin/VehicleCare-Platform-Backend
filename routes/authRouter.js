const Router = require("express").Router();
const authController = require("../controllers/auth.controller");

Router.post("/register", authController.register);
Router.post("/login", authController.login);

module.exports = Router;
