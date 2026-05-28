const { body } = require("express-validator");

exports.createCapteurValidator = [
    body("id").notEmpty().withMessage("id est requis"),
    body("temperature").notEmpty().isNumeric().withMessage("temperature est nombre"),
    body("humidite").notEmpty().isNumeric().withMessage("humidite est nombre"),
    body("id_camion").notEmpty().withMessage("id camion est requis")

];