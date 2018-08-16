const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create Check Model
let checkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}
,
{
	strict: true
});

module.exports = Check = mongoose.model("Check", checkSchema);
