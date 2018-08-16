const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Note Model
const PaidOut = require('../../models/PaidOut');

// @route 	GET api/paidOut/:cid
// @desc 		Returns data of a specific paidOut
// @access 	Private
router.get('/:cid', (req,res) => {
	PaidOut.findOne({'_id': req.params.cid}, {__v: 0})
		.then(paidOut => res.status(200).send(paidOut))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/paidOut/:cid
// @desc 		Update data of a specific paidOut
// @access 	Private
router.put('/:cid', (req,res) => {
	PaidOut.findByIdAndUpdate(req.params.cid, req.body, {new: true})
		.then(paidOut => res.status(200).send(paidOut))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/paidOut/:cid
// @desc 		Delete a specific paidOut
// @access 	Private
router.delete('/:cid', (req,res) => {
  PaidOut.findByIdAndRemove(req.params.cid)
		.then(paidOut => res.status(200).send("Paid Out was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
