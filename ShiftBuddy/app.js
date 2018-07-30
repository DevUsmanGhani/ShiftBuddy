const express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/shift_buddy', { useNewUrlParser: true });

// SCHEMA SETUP
// Checks
let checkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    num: { type: Number, required: true },
    amount: { type: Number, required: true }
});
let Check = mongoose.model("Check", checkSchema);

// Paid Outs
let paidOutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true }
});
let PaidOut = mongoose.model("PaidOut", paidOutSchema);

// Shifts
let shiftSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    notes: [],
    inventoryStart: {},
    inventoryStop: {},
    paidOuts: [{ type: mongoose.Schema.Types.ObjectId, ref: "PaidOut" }],
    checks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Check" }]
});
let Shift = mongoose.model("Shift", shiftSchema);

// Employees
let employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    birthday: String,
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }]
});
let Employee = mongoose.model("Employee", employeeSchema);

// Managers
let managerSchema = new mongoose.Schema({
	name: { type: String, required: true },
    email: String,
    settings: {
    	inventory: [
	    	{
	    		name: { type: String, required: true },
	    		amount: { type: Number, default: 0}
	    	}
    	]
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
let Manager = mongoose.model("Manager", managerSchema);

/*=================================== MANAGER ROUTES ===================================*/


// Employee Routes
app.get('/managers/:mid/employees', function(req,res) {
    Manager.findById(req.params.mid, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager.employees);
    });
});

app.post('/managers/:mid/employees', function(req,res) {
   Manager.findById(req.params.mid, function (err, manager) {
	if (err || !manager) return res.status(404).send("The specified resource does not exist.");
		manager.employees.push(req.body);
		manager.save(function(err, manager) {
			if (err) return res.status(400).send("One of the request inputs is not valid.");
			else res.status(200).send(req.body);
		});
	});
});

app.get('/managers/:mid/employees/:eid', function(req,res) {
	Manager.findOne({'employees._id': req.params.eid}, {'employees.$': 1}, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        else res.status(200).send(manager.employees[0]);
    });
});

app.put('/managers/:mid/employees/:eid', function(req,res) {
	Manager.updateOne({ _id: req.params.mid, "employees._id": req.params.eid }, {$set: {"employees.$": req.body}}, function(err, employee) {
		if (err) return res.status(404).send("The specified resource does not exist.");
		res.send(employee);
	});
});

app.delete('/managers/:mid/employees/:eid', function(req,res) {
    Manager.updateOne({ _id: req.params.mid }, {$pull: { employees: { _id: req.params.eid}}}, function(err, org) {
		if (err) return res.status(404).send("The specified resource does not exist.");
		res.send(org);
	});
});


// Run 
app.listen(3000, function() {
	console.log("ShiftBudder server is running on port 3000");
});


