const Camion = require("../models/CamionModel");
const AppError = require("../utils/AppError");
const { validationResult } = require("express-validator");

exports.createCamion = async (req, res,next) => {
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
    next(error)
  }
};

exports.getAllCamion = async (req, res,next) => {
  try {
    const camions = await Camion.find();
    res.status(200).json({
      message: "camionfetched ",
      data: camions
    });
  } catch (error) {
    next(error)
    
  }
};

exports.getCamionById = async (req, res,next) => {
  try {
    const camion = await Camion.findOne({ id: req.params.id });
    if (!camion) {
      return next (new AppError("camion n'est pas trouve", 404));
      
    }
    res.status(200).json({
      message: "camion trouve",
      data: {
        camion: camion,
      },
    });
  } catch (error) {
    next(error)
  }
};
 
exports.updateCamion = async (req, res,next) => {
  try {
    const camion = await Camion.findOneAndUpdate({ id: req.params.id },req.body,{ new: true});
    if (!camion) {
      return next (new AppError("camion n'est pas trouve", 404));;
    }
    res.status(200).json({ message: "camion modifie", data: camion });
  } catch (error) {
    next(error)
  }
};

exports.deleteCamion = async (req, res,next) => {
  try {
    const camion = await Camion.findOneAndDelete({ id: req.params.id });
    if (!camion) {
      return next (new AppError("camion n'est pas trouve", 404));;
    }
    res.status(200).json({ message: "camion supprime", data: camion });
  } catch (error) {
    next(error)
  }
};