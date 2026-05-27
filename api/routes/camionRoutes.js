
const {
  createCamion,
  getAllCamion,
  getCamionById,
  
} = require("../controllers/camionController");

const express = require("express");


const router = express.Router();



router.route("/").post(createCamion).get(getAllCamion);
router
  .route("/:id")
  .get(getCamionById)
  

module.exports = router;