const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const camionRoutes = require("./routes/camionRoutes");
const capteurRoutes = require("./routes/capteurRoutes");
const authRoutes = require("./routes/authRoutes");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100
});




dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to the DB secured ");
  })
  .catch((e) => {
    console.log("Error: " + e);
  });



const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/camions", camionRoutes);
app.use("/api/capteurs", capteurRoutes);



const port = 3000;
app.listen(port, () => {
  console.log("The server is running !!!!");
});