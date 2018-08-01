const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create Shift Model
let noteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
   message: {
    type: String,
    required: true
  }
}, 
{
	strict: true
});

module.exports = Note = mongoose.model("Note", noteSchema);