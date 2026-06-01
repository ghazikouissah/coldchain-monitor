const { createCapteurValidator } = require("../validators/capteurValidator");

const {
  createCapteur,
  getAllCapteurs,
  getCapteurById,
  getCapteursByCamion,
  updateCapteur,
  deleteCapteur,
} = require("../controllers/capteurController");

const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(protect,createCapteurValidator, createCapteur).get(protect,getAllCapteurs);

router.route("/:id").get(protect,getCapteurById)
.put (protect,updateCapteur)
.delete(protect,deleteCapteur)

;
router.route("/camion/:id_camion").get(getCapteursByCamion);

module.exports = router;