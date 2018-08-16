const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create CashDrop Model
let cashDropSchema = new Schema({
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

module.exports = CashDrop = mongoose.model("CashDrop", cashDropSchema); 
