const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const port = process.env.PORT || 9002;
dotenv.config();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const authRouter = require("./routes/authRouter");
const ownerRouter = require("./routes/ownerRouter");
const vehicleRouter = require("./routes/vehicleRouter");
const technicianRouter = require("./routes/technicianRouter");
const serviceTypeRouter = require("./routes/serviceTypeRouter");
const appointmentRouter = require("./routes/appointmentRouter");

// APIS
app.use("/api", authRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/technician", technicianRouter);
app.use("/api/serviceType", serviceTypeRouter);
app.use("/api/appointment", appointmentRouter);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
