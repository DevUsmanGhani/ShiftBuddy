const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create inventory item Model
let inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  amount: {
    type: Number,
    default: 0,
    required: true
  }
},
{
	strict: true
});

module.exports = InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema); 