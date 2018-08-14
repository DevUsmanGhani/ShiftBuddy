const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load InventoryItem Model
const InventoryItem = require('../../models/InventoryItem');

// @route   DELETE api/inventoryItem/:id
// @desc    Delete a specific inventoryItem
// @access  Public
router.delete('/:id', (req, res) => {
  InventoryItem.findByIdAndRemove(req.params.id)
    .then(inventoryItem => res.status(200).send("Item '"+ inventoryItem.name +"' was deleted."))
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

module.exports = router;