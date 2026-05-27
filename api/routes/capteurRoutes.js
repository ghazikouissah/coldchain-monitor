const {
  createCapteur,
  getAllCapteurs,
  getCapteurById,
  getCapteursByCamion,
} = require("../controllers/capteurController");

const express = require("express");
const router = express.Router();

router.route("/").post(createCapteur).get(getAllCapteurs);
router.route("/:id").get(getCapteurById);
router.route("/camion/:id_camion").get(getCapteursByCamion);

module.exports = router;