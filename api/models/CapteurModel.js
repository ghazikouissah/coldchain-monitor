
const mongoose = require("mongoose");


const capteurSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "The id is required !!!!"],
    unique: [true]
  },
  temperature: {
    type:Number,
    required:[true]
  },
  humidite: {
    type:Number,
    required:[true]
  },
  statut_clim: {
    type:Boolean,
    default:true
  },
  id_camion:{
    type:String,
    required:[true]
  },

 
  created_at: {
    type: Date,
    default: Date.now(),
  }
  
})
const capteur = mongoose.model("capteur", capteurSchema);

module.exports = capteur;