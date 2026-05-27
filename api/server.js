const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const camionRoutes = require("./routes/camionRoutes");
const capteurRoutes = require("./routes/capteurRoutes");




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
app.use("/api/camions", camionRoutes);
app.use("/api/capteurs", capteurRoutes);



const port = 3000;
app.listen(port, () => {
  console.log("The server is running !!!!");
});