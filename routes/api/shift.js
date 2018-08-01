const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Shift Model
const Shift = require('../../models/Shift');

// @route 	GET api/shifts/:sid
// @desc 		Returns data of a specific shift
// @access 	Private
router.get('/:sid', (req,res) => {
	Shift.findOne({'_id': req.params.sid}, { notes: 0, paidOuts: 0, checks: 0, __v: 0 } )
		.then(shift => res.status(200).send(shift))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/shifts/:sid
// @desc 		Update data of a specific shift
// @access 	Private
router.put('/:sid', (req,res) => {
	Shift.findByIdAndUpdate(req.params.sid, req.body, {new: true})
		.then(shift => res.status(200).send(shift))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/shifts/:sid
// @desc 		Delete a specific shift
// @access 	Private
router.delete('/:sid', (req,res) => {
  Shift.findByIdAndRemove(req.params.sid)
		.then(shift => res.status(200).send("Shift was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route  	GET api/shifts/:sid/notes
// @desc    Returns all notes of a specific shift
// @access  Private
router.get('/:sid/notes', (req, res) => {
  Shift.findById(req.params.sid)
    .then(shift => { 
      Note.find({ "_id": { $in: shift.notes } })
        .then(notes => res.status(200).send(notes))
        .catch(error => res.status(404).send("The specified resource does not exist."))
		})
		.catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   POST api/shifts/:sid/notes
// @desc    Creates a note for a specific shift
// @access  Private
router.post('/:sid/notes', (req, res) => {
  Note.create(req.body)
    .then(note => {
      Shift.findOne({_id: req.params.sid})
        .then(shift => {
          shift.notes.push(note);
          shift.save();
          res.status(200).send(req.body);
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))
});

// @route   GET api/shifts/:sid/cashOuts
// @desc    Returns all cash outs of a specific shift
// @access  Private
router.get('/:sid/cashOuts', (req, res) => {
  Shift.findById(req.params.sid)
    .then(shift => { 
      CashOut.find({ "_id": { $in: shift.cashOuts } })
        .then(cashOuts => res.status(200).send(cashOuts))
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   POST api/shifts/:sid/cashOuts
// @desc    Creates a cash out for a specific shift
// @access  Private
router.post('/:sid/cashOuts', (req, res) => {
  CashOut.create(req.body)
    .then(cashOut => {
      Shift.findOne({_id: req.params.sid})
        .then(shift => {
          shift.cashOuts.push(cashOut);
          shift.save();
          res.status(200).send(req.body);
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))
});

// @route   GET api/shifts/:sid/checks
// @desc    Returns all checks of a specific shift
// @access  Private
router.get('/:sid/checks', (req, res) => {
  Shift.findById(req.params.sid)
    .then(shift => { 
      Check.find({ "_id": { $in: shift.checks } })
        .then(checks => res.status(200).send(checks))
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   POST api/shifts/:sid/checks
// @desc    Creates a check for a specific shift
// @access  Private
router.post('/:sid/checks', (req, res) => {
  Check.create(req.body)
    .then(check => {
      Shift.findOne({_id: req.params.sid})
        .then(shift => {
          shift.checks.push(check);
          shift.save();
          res.status(200).send(req.body);
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))
});

module.exports = router;
