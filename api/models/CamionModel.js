
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