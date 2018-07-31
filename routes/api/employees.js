const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Employee Model
const Employee = require('../../models/Employee');

// @route   GET api/emplpoyees/:eid
// @desc  Returns data of a specific employee
// @access  Public
router.get('/:eid', function(req,res) {
  Employee.findOne({'_id': req.params.eid}, { shifts: 0, __v: 0 }, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        else res.status(200).send(employee);
    });
});

// @route   PUT api/emplpoyees/:eid
// @desc  Update data of a specific employee
// @access  Public
router.put('/:eid', function(req,res) {
  Employee.findByIdAndUpdate(req.params.eid, req.body, {new: true}, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        let result = {"_id": employee._id, "name": employee.name, "phone": employee.phone, "birthday": employee.birthday, "salary": employee.salary};
        res.status(200).send(result);
    });
});

// @route   DELETE api/emplpoyees/:eid
// @desc  Delete a specific employee
// @access  Public
router.delete('/:eid', function(req,res) {
    Employee.findByIdAndRemove(req.params.eid, function (err, employee) {
        if (err || !employee) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Employee '"+ employee.name +"' was deleted.");
    });
});

// @route  GET api/employees/:eid/shifts
// @desc  Returns all shifts of a specific employee
// @access  Private
router.get('/:eid/shifts', function(req,res) {
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

// @route   POST api/employees/:eid/shifts
// @desc  Creates a shift for a specific employee
// @access  Private
router.post('/:eid/shifts', function(req,res) {
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

module.exports = router;

