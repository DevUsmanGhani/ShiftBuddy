const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create PaidOut Model
let cashOutSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  amount: {
    type: Number,
    required: true
  },
  isDrop: {
    type: Boolean,
    required: true
  }
},
{
	strict: true
});

module.exports = CashOut = mongoose.model("CashOut", cashOutSchema); 