const { body } = require("express-validator");

exports.createCamionValidator = [
    body("id").notEmpty().withMessage("id est requis"),
    body("chauffeur").notEmpty().withMessage("chauffeur est requis"),
];