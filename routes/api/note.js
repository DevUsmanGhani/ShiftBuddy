const express = require('express');
			router = express.Router();
			bcrypt = require('bcryptjs');

// Load Note Model
const Note = require('../../models/Note');

// @route 	GET api/notes/:nid
// @desc 		Returns data of a specific note
// @access 	Private
router.get('/:nid', (req,res) => {
	Note.findOne({'_id': req.params.nid}, {__v: 0})
		.then(note => res.status(200).send(note))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	PUT api/notes/:nid
// @desc 		Update data of a specific note
// @access 	Private
router.put('/:nid', (req,res) => {
	Note.findByIdAndUpdate(req.params.nid, req.body, {new: true})
		.then(note => res.status(200).send(note))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});

// @route 	DELETE api/notes/:nid
// @desc 		Delete a specific note
// @access 	Private
router.delete('/:nid', (req,res) => {
  Note.findByIdAndRemove(req.params.nid)
		.then(note => res.status(200).send("Note was deleted."))
		.catch(err => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
