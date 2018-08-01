const mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			Note = require("./Note"),
			PaidOut = require("./PaidOut"),
			Check = require("./Check");

// Create Shift Model
let shiftSchema = new mongoose.Schema({
  date: { 
  	type: Date, 
  	default: Date.now 
  },
  notes: [
	  {
	    type: mongoose.Schema.Types.ObjectId, 
	    ref: Note
	  }
  ],
  inventoryStart: {},
  inventoryStop: {},
  paidOuts: [
  	{
  		type: mongoose.Schema.Types.ObjectId, 
  		ref: PaidOut
  	}
	],
  checks: [
  	{
  		type: mongoose.Schema.Types.ObjectId, 
  		ref: Check
  	}
	]
}, 
{
	strict: true
});

module.exports = Shift = mongoose.model("Shift", shiftSchema);