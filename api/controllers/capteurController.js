const Capteur = require("../models/CapteurModel");
const AppError = require("../utils/AppError");
const { validationResult } = require("express-validator");

exports.createCapteur = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  try {
    const newCapteur = await Capteur.create(req.body);
    res.status(201).json({
      message: "capteur created",
      data: newCapteur,
    });
  } catch (error) {
    next(error)
  }
};

exports.getAllCapteurs = async (req, res,next) => {
  try {
    const capteurs = await Capteur.find();
    res.status(200).json({
      message: "capteurs fetched",
      data: capteurs,
    });
  } catch (error) {
    next(error)
  }
};

exports.getCapteurById = async (req, res,next) => {
  try {
    const capteur = await Capteur.findOne({ id: req.params.id });
    if (!capteur) {
      return next (new AppError("capteur n'est pas trouve", 404));
    }
    res.status(200).json({ message: "capteur trouve", data: capteur });
  } catch (error) {
    next(error)
  }
};

exports.getCapteursByCamion = async (req, res,next) => {
  try {
    const capteurs = await Capteur.find({ id_camion: req.params.id_camion });
    res.status(200).json({
      message: "capteurs fetched",
      data: capteurs,
    });
  } catch (error) {
    next(error)
  }
};

exports.updateCapteur = async (req, res,next) => {
  try {
    const capteur = await Capteur.findOneAndUpdate({ id: req.params.id },req.body,{ new: true});
    if (!capteur) {
      return next (new AppError("capteur n'est pas trouve", 404));
    }
    res.status(200).json({ message: "capteur modifie", data: capteur });
  } catch (error) {
    next(error)
  }
};

exports.deleteCapteur = async (req, res,next) => {
  try {
    const capteur = await Capteur.findOneAndDelete({ id: req.params.id });
    if (!capteur) {
      return next (new AppError("capteur n'est pas trouve", 404));
    }
    res.status(200).json({ message: "capteur supprime", data: capteur });
  } catch (error) {
    next(error)
  }
};