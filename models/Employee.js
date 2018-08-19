const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Employee Schema
const employeeSchema = new Schema({
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
  },
  name: { 
  	type: String, 
  	required: true 
  },
  phone: String,
  birthday: String,
  salary: { 
  	type: Number, 
  	required: true 
  },
  shifts: [
  	{
  		type: Schema.Types.ObjectId, 
  		ref: "Shift"
  	}
  ]
},
{
  strict: true
});

module.exports = Employee = mongoose.model("Employee", employeeSchema);
