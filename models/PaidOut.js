const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create PaidOut Model
let paidOutSchema = new Schema({
  name: {
    type: String, 
    required: true 
  },
  amount: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
  },
  shift: {
    type: Schema.Types.ObjectId,
    ref: "Shift",
  }
},
{
	strict: true
});

module.exports = PaidOut = mongoose.model("PaidOut", paidOutSchema); 
