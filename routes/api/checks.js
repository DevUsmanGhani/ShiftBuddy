const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Note Model
const Check = require('../../models/Check');

// @route 	GET api/checks/:cid
// @desc 		Returns data of a specific check
// @access 	Private
router.get('/:cid', (req,res) => {
	Check.findOne({'_id': req.params.cid}, {__v: 0})
		.then(check => res.status(200).send(check))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/checks/:cid
// @desc 		Update data of a specific check
// @access 	Private
router.put('/:cid', (req,res) => {
	Check.findByIdAndUpdate(req.params.cid, req.body, {new: true})
		.then(check => res.status(200).send(check))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/checks/:cid
// @desc 		Delete a specific check
// @access 	Private
router.delete('/:cid', (req,res) => {
  Check.findByIdAndRemove(req.params.cid)
		.then(check => res.status(200).send("Check was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
