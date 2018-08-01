const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Employee Model
const Employee = require('../../models/Employee');

// @route   GET api/emplpoyees/:eid
// @desc    Returns data of a specific employee
// @access  Public
router.get('/:eid', (req,res) => {
  Employee.findOne({'_id': req.params.eid}, { shifts: 0, __v: 0 })
      .then(employee => res.status(200).send(employee))
      .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   PUT api/emplpoyees/:eid
// @desc    Update data of a specific employee
// @access  Public
router.put('/:eid', (req, res) => {
  Employee.findByIdAndUpdate(req.params.eid, req.body, {new: true})
    .then(employee => {
      res.status(200).send(employee);
    })
    .catch(error => res.status(404).send("The specified resource does not exist."));
});

// @route   DELETE api/emplpoyees/:eid
// @desc    Delete a specific employee
// @access  Public
router.delete('/:eid', (req, res) => {
    Employee.findByIdAndRemove(req.params.eid)
      .then(employee => res.status(200).send("Employee '"+ employee.name +"' was deleted."))
      .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route  GET api/employees/:eid/shifts
// @desc    Returns all shifts of a specific employee
// @access  Private
router.get('/:eid/shifts', (req, res) => {
    Employee.findById(req.params.eid)
      .then(employee => { 
        Shift.find({ "_id": { $in: employee.shifts } }, { notes: 0, paidOuts: 0, checks: 0, __v: 0})
          .then(shifts => res.status(200).send(shifts))
          .catch(error => res.status(404).send("The specified resource does not exist."))
      .catch(error => res.status(404).send("The specified resource does not exist."))
  })
});

// @route   POST api/employees/:eid/shifts
// @desc    Creates a shift for a specific employee
// @access  Private
router.post('/:eid/shifts', (req, res) => {
  Shift.create(req.body)
    .then(shift => {
      Employee.findOne({_id: req.params.eid})
        .then(employee => {
          employee.shifts.push(shift);
          employee.save();
          res.status(200).send(req.body);
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))

});

module.exports = router;

