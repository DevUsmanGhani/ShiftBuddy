const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys')

// Load Manager Validations
const validateManagerInput = require('../../validations/validateManagerInput')

// Load Manager Model
const Manager = require('../../models/Manager');

// @route   GET api/managers
// @desc    Returns all managers
// @access  Private
router.get('/', (req, res) => {
  Manager.find({}, { employees: 0, __v: 0, settings: 0 })
    .then(managers => res.status(200).send(managers))
    .catch(error => res.status(500).send("The server encountered an internal error. Please retry the request."))
});

// @route   POST api/managers
// @desc    Create a manager with encrypted password
// @access  Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateManagerInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  Manager.findOne({ email: req.body.email})
  .then(manager => {
    if(manager) {
      errors.email = "This email already exists";
      return res.status(400).json(errors);
    }
    else {
      const manager = new Manager(req.body);
      
      // Hashing the password
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(manager.password, salt, (err, hash) => {
          if (err) throw err;
          manager.password = hash;
          manager
          .save()
          .then(manager => res.json(manager))
          .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/managers/login
// @desc    Login Manager / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  // todo validation for login
  errors = {};

  const email = req.body.email;
  const password = req.body.password;

  Manager.findOne({ email })
  .then(manager => {
    if (!manager) {
      errors.email = "No account with this email was found.";
      return res.status(400).json(errors);
    }
    // Compare hashed password
    bcrypt.compare(password, manager.password)
    .then(isMatch => {
      if(isMatch) {
        // If the password is correct...
        // Create a payload for the JWT with just the manager id and name
        const payload = { id: manager.id, name: manager.name};

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
      else {
        errors.password ="The password entered is incorrect";
        res.status(400).json(errors);
      }
    })
  })
})


// @route   GET api/managers/:mid
// @desc    Returns all data about a specific employee
// @access  Private
router.get('/:mid', passport.authenticate('jwt', { session: false }), (req, res) => {
  Manager.findOne({'_id': req.params.mid}, { employees: 0, __v: 0 })
    .then(manager => res.status(200).send(manager))
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   PUT api/managers/:mid
// @desc    Updates a specific manager
// @access  Private 
router.put('/:mid', (req, res) => {
  Manager.findByIdAndUpdate(req.params.mid, req.body, {new: true})
    .then(manager => res.status(200).send(manager))
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   DELETE api/managers/:mid
// @desc    Deletes a specific manager
// @access  Private
router.delete('/:mid', (req, res) => {
  Manager.findByIdAndRemove(req.params.mid)
    .then(manager => res.status(200).send("Manager '"+ manager.name +"' was deleted."))
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   GET api/managers/:mid/emplpoyees
// @desc    Returns all employees of a specific manager
// @access  Private 
router.get('/:mid/employees', (req, res) => {
  Manager.findById(req.params.mid)
    .then(manager => {
      Employee.find({ "_id": { $in: manager.employees } }, { shifts: 0, __v: 0 })
        .then(employees => res.status(200).send(employees))
        .catch(error => res.status(404).send("The specified resource does not exist."))
      
    })
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   POST api/managers/:mid/emplpoyees
// @desc    Creats a employee for a specific manager
// @access  Public
router.post('/:mid/employees', (req, res) => {
  Employee.create(req.body)
    .then(employee => {
      Manager.findOne({_id: req.params.mid})
        .then(manager => {
          manager.employees.push(employee);
          manager.save();
          res.status(200).send({_id: employee._id, ...req.body});
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))
});

// @route   GET api/managers/:mid/settings/inventory
// @desc    Returns all data about a specific manager inventory settings
// @access  Private
router.get('/:mid/settings/inventory', (req, res) => {
  Manager.findOne({'_id': req.params.mid})
    .then(manager => res.status(200).send(manager.settings.inventory))
    .catch(error => res.status(404).send("The specified resource does not exist."))
});

// @route   POST api/managers/:mid/settings/inventory
// @desc    Updates a specific manager inventory settings
// @access  Private 
router.post('/:mid/settings/inventory', (req, res) => {
  Manager.findOne({'_id': req.params.mid})
    .then(manager => {
      manager.settings.inventory.push(req.body);
      manager.save();
      res.status(200).send(manager.settings.inventory);
    })
    .catch(error => res.status(404).send("The specified resource does not exist."))
});


module.exports = router;
