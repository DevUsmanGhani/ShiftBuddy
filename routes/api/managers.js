const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const validateManagerInput = require('../../validations/manager')

// Load Manager Model
const Manager = require('../../models/Manager');

// @route   GET api/managers/test
// @desc    Tests Manager route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Manager Works!"}));

// @route   POST api/managers
// @desc    Crate a manager
// @access  Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateManagerInput(req.body);

  // Check Validation
  if(!isValid) {
    console.log(isValid)
    return res.status(400).json( errors );
  }

  Manager.findOne({ email: req.body.email})
  .then(manager => {
    if(manager){
      errors.email = "This email already exists";
      return res.status(400).json(errors);
    }
    else{
      const newManager = new Manager({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      newManager
      .save()
      .then(newManager => res.json(newManager))
      .catch(err => console.log(err));
    }
  });
});

module.exports = router;

