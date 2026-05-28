const { createCamionValidator } = require("../validators/camionValidator");
const { protect, restrictTo } = require("../middleware/auth");
const {
  createCamion,
  getAllCamion,
  getCamionById,
  
} = require("../controllers/camionController");

const express = require("express");


const router = express.Router();



router.route("/").post(protect, restrictTo("admin"), createCamionValidator, createCamion).get(protect, getAllCamion);
router
  .route("/:id")
  .get(protect,getCamionById)
  

module.exports = router;