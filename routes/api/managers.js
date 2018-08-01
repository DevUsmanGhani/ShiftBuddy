const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const validateManagerInput = require('../../validations/manager')

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
// @desc    Crate a manager
// @access  Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateManagerInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  Manager.findOne({ email: req.body.email})
  .then(manager => {
    if(manager){
      errors.email = "This email already exists";
      return res.status(400).json(errors);
    }
    else{
      Manager.create(req.body)
      .then(newManager => res.json(newManager))
      .catch(err => console.log(err));
    }
  });
});


// @route   GET api/managers/:mid
// @desc    Returns all data about a specificc employee
// @access  Private
router.get('/:mid', (req, res) => {
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
          res.status(200).send(req.body);
        })
        .catch(error => res.status(404).send("The specified resource does not exist."))
    })
    .catch(error => res.status(400).json(error))
});

module.exports = router;

