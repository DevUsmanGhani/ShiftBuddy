const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Note Model
const CashOut = require('../../models/CashOut');

// @route 	GET api/cashOut/:cid
// @desc 		Returns data of a specific cashOut
// @access 	Private
router.get('/:cid', (req,res) => {
	CashOut.findOne({'_id': req.params.cid}, {__v: 0})
		.then(cashOut => res.status(200).send(cashOut))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/cashOut/:cid
// @desc 		Update data of a specific cashOut
// @access 	Private
router.put('/:cid', (req,res) => {
	CashOut.findByIdAndUpdate(req.params.cid, req.body, {new: true})
		.then(cashOut => res.status(200).send(cashOut))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/cashOut/:cid
// @desc 		Delete a specific cashOut
// @access 	Private
router.delete('/:cid', (req,res) => {
  CashOut.findByIdAndRemove(req.params.cid)
		.then(cashOut => res.status(200).send("Cash Out was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
