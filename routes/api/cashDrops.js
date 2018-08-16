const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Note Model
const CashDrop = require('../../models/CashDrop');

// @route 	GET api/cashDrop/:cid
// @desc 		Returns data of a specific cashDrop
// @access 	Private
router.get('/:cid', (req,res) => {
	CashDrop.findOne({'_id': req.params.cid}, {__v: 0})
		.then(cashDrop => res.status(200).send(cashDrop))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/cashDrop/:cid
// @desc 		Update data of a specific cashDrop
// @access 	Private
router.put('/:cid', (req,res) => {
	CashDrop.findByIdAndUpdate(req.params.cid, req.body, {new: true})
		.then(cashDrop => res.status(200).send(cashDrop))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/cashDrop/:cid
// @desc 		Delete a specific cashDrop
// @access 	Private
router.delete('/:cid', (req,res) => {
  CashDrop.findByIdAndRemove(req.params.cid)
		.then(cashDrop => res.status(200).send("Cash Drop was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
