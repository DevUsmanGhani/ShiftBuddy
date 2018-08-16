const mongoose = require('mongoose'), 
      Schema = mongoose.Schema;

// Create Shift Model
let noteSchema = new Schema({
  title: { 
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
