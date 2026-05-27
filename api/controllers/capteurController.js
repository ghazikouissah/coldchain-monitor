const Capteur = require("../models/CapteurModel");

exports.createCapteur = async (req, res) => {
  try {
    const newCapteur = await Capteur.create(req.body);
    res.status(201).json({
      message: "capteur created",
      data: newCapteur,
    });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

exports.getAllCapteurs = async (req, res) => {
  try {
    const capteurs = await Capteur.find();
    res.status(200).json({
      message: "capteurs fetched",
      data: capteurs,
    });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

exports.getCapteurById = async (req, res) => {
  try {
    const capteur = await Capteur.findOne({ id: req.params.id });
    if (!capteur) {
      return res.status(404).json({ message: "capteur not found" });
    }
    res.status(200).json({ message: "capteur trouve", data: capteur });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

exports.getCapteursByCamion = async (req, res) => {
  try {
    const capteurs = await Capteur.find({ id_camion: req.params.id_camion });
    res.status(200).json({
      message: "capteurs fetched",
      data: capteurs,
    });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};