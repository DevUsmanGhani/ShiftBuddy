const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Employee Schema

const employeeSchema = new mongoose.Schema({
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
    		type: mongoose.Schema.Types.ObjectId, 
    		ref: "Shift"
    	}
	]
},
{
  strict: true
});

module.exports = Employee = mongoose.model("Employee", employeeSchema);