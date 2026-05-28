const Camion = require("../models/CamionModel");

const { validationResult } = require("express-validator");

exports.createCamion = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  try {
    const newCamion = await Camion.create(req.body);
    res.status(201).json({
      message: "camion created ",
      data: newCamion,
    });
  } catch (error) {
    res.status(400).json({
      message: "fail ",
      error: error,
    });
  }
};

exports.getAllCamion = async (req, res) => {
  try {
    const camions = await Camion.find();
    res.status(200).json({
      message: "camionfetched ",
      data: camions
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail ",
      error: error,
    });
  }
};

exports.getCamionById = async (req, res) => {
  try {
    const camion = await Camion.findOne({ id: req.params.id });
    if (!camion) {
      return res.status(404).json({
        message: "camion not found ",
      });
    }
    res.status(200).json({
      message: "camion trouve",
      data: {
        camion: camion,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail ",
      error: error,
    });
  }
};

