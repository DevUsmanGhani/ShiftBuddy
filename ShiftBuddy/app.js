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

// Notes
let noteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true }
});
let Note = mongoose.model("Note", noteSchema);

// Shifts
let shiftSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    notes: [],
    inventoryStart: {},
    inventoryStop: {},
    paidOuts: [{type: mongoose.Schema.Types.ObjectId, ref: "PaidOut"}],
    checks: [{type: mongoose.Schema.Types.ObjectId, ref: "Check"}]
});
let Shift = mongoose.model("Shift", shiftSchema);

// Employees
let employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    birthday: String,
    salary: { type: Number, required: true },
    shifts: [{type: mongoose.Schema.Types.ObjectId, ref: "Shift"}]
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
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}]
});
let Manager = mongoose.model("Manager", managerSchema);

/*=================================== MANAGER ROUTES ===================================*/
// @route 	GET api/managers
// @desc 	Returns all managers
// @access 	Private
app.get('/managers', function(req,res) {
	Manager.find({}, { employees: 0, __v: 0, settings: 0 }, function (err, managers) {
		if (err) return res.status(500).send("The server encountered an internal error. Please retry the request.");
		res.status(200).send(managers);
	});
});

// @route 	POST api/managers
// @desc 	Creates a new manager
// @access 	Private
app.post('/managers', function(req,res) {
	Manager.create(req.body, function (err, manager) {
		if (err) return res.status(400).send("One of the request inputs is not valid.");
		res.status(200).send(manager);
	});
});

// @route 	GET api/managers/:mid
// @desc 	Returns all data about a specificc employee
// @access 	Private
app.get('/managers/:mid', function(req,res) {
    Manager.findOne({'_id': req.params.mid}, { employees: 0, __v: 0 }, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

// @route 	PUT api/managers/:mid
// @desc 	Updates a specific manager
// @access 	Private 
app.put('/managers/:mid', function(req,res) {
    Manager.findByIdAndUpdate(req.params.mid, req.body, {new: true}, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

// @route 	DELETE api/managers/:mid
// @desc 	Deletes a specific manager
// @access 	Private
app.delete('/managers/:mid', function(req,res) {
    Manager.findByIdAndRemove(req.params.mid, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Manager '"+ manager.name +"' was deleted.");

    });
});

/*=================================== EMPLOYEE ROUTES ===================================*/
// @route 	GET api/managers/:mid/emplpoyees
// @desc 	Returns all employees of a specific manager
// @access 	Private 
app.get('/managers/:mid/employees', function(req,res) {
    Manager.findById(req.params.mid, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        else {
        	Employee.find({ "_id": { $in: manager.employees } }, { shifts: 0, __v: 0 }, function(err, result) {
				if (err || !result) return res.status(404).send("The specified resource does not exist.");
				res.status(200).send(result);
			});
    	}
	});
});

// @route 	POST api/managers/:mid/emplpoyees
// @desc 	Creats a employees of a specific manager
// @access 	Public
app.post('/managers/:mid/employees', function(req,res) {
	Employee.create(req.body, function(err, employee) {
		Manager.findOne({_id: req.params.mid}, function(err, manager) {
			if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
			else {
				manager.employees.push(employee);
				manager.save();
				res.status(200).send(req.body);
			}
		});
	});
});

// @route 	GET api/emplpoyees/:eid
// @desc 	Returns data of a specific employee
// @access 	Public
app.get('/employees/:eid', function(req,res) {
	Employee.findOne({'_id': req.params.eid}, { shifts: 0, __v: 0 }, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        else res.status(200).send(employee);
    });
});

// @route 	PUT api/managers/:mid/emplpoyees/:eid
// @desc 	Update data of a specific employee
// @access 	Public
app.put('/employees/:eid', function(req,res) {
	Employee.findByIdAndUpdate(req.params.eid, req.body, {new: true}, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        let result = {"_id": employee._id, "name": employee.name, "phone": employee.phone, "birthday": employee.birthday, "salary": employee.salary};
        res.status(200).send(result);
    });
});

// @route 	DELETE api/emplpoyees/:eid
// @desc 	Delete a specific employee
// @access 	Public
app.delete('/employees/:eid', function(req,res) {
    Employee.findByIdAndRemove(req.params.eid, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Employee '"+ employee.name +"' was deleted.");
    });
});

/*=================================== SHIFT ROUTES ===================================*/
/// @route 	GET api/employees/:eid/shifts
// @desc 	Returns all shifts of a specific employee
// @access 	Private
app.get('/employees/:eid/shifts', function(req,res) {
    Employee.findById(req.params.eid, function (err, employee) {
        if (err || !employee ) return res.status(404).send("The specified resource does not exist.");
        else {
        	Shift.find({ "_id": { $in: employee.shifts } }, function(err, result) {
				if (err || !result) return res.status(404).send("The specified resource does not exist.");
				res.status(200).send(result);
			});
    	}
	});
});

// @route 	POST api/employees/:eid/shifts
// @desc 	Creates a shift for a specific employee
// @access 	Private
app.post('/employees/:eid/shifts', function(req,res) {
	Shift.create(req.body, function(err, shift) {
		Employee.findOne({_id: req.params.eid}, function(err, employee) {
			if (err || !employee ) return res.status(404).send("The specified resource does not exist.");
			else {
				employee.shifts.push(shift);
				employee.save();
				res.status(200).send(req.body);
			}
		});
	});
});

// @route 	GET api/shifts/:sid
// @desc 	Returns data of a specific shift
// @access 	Private
app.get('/shifts/:sid', function(req,res) {
	Shift.findOne({'_id': req.params.sid}, { shifts: 0, __v: 0 }, function (err, shift) {
        if (err || !shift) return res.status(404).send("The specified resource does not exist.");
        else res.status(200).send(shift);
    });
});

// @route 	PUT api/shifts/:sid
// @desc 	Update data of a specific shift
// @access 	Private
app.put('/shifts/:sid', function(req,res) {
	Shift.findByIdAndUpdate(req.params.sid, req.body, {new: true}, function (err, shift) {
        if (err || !shift) return res.status(404).send("The specified resource does not exist.");
        let result = { "date": shift.date, "notes": shift.notes, "inventoryStart": shift.inventoryStart, "inventoryStop": shift.inventoryStop}
        res.status(200).send(result);
    });
});

// @route 	DELETE api/shifts/:sid
// @desc 	Delete a specific shift
// @access 	Private
app.delete('/shifts/:sid', function(req,res) {
    Shift.findByIdAndRemove(req.params.sid, function (err, shift) {
        if (err || !shift) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Shift was deleted.");
    });
});

// Run 
app.listen(3000, function() {
	console.log("ShiftBudder server is running on port 3000");
});


