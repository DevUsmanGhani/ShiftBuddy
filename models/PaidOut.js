const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create PaidOut Model
let paidOutSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  amount: {
    type: Number,
    required: true
  }
},
{
	strict: true
});

module.exports = PaidOut = mongoose.model("PaidOut", paidOutSchema); 