
const mongoose = require("mongoose");


const camionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "The id is required !!!!"],
    unique: [true, "chauffeur  exist !!!"]
  },
  chauffeur: {
    type:String,
    required:[true]
  },
  latitude: { type: Number, default: 36.8065 },
  longitude: { type: Number, default: 10.1815 },
  capteurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "capteur"
  }],

 
  created_at: {
    type: Date,
    default: Date.now(),
  }
  
})
const camion = mongoose.model("camion", camionSchema);

module.exports = camion;