const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const validateManagerInput = require('../../validations/manager')

// Load Manager Model
const Manager = require('../../models/Manager');

// @route   GET api/managers
// @desc  Returns all managers
// @access  Private
router.get('/', function(req,res) {
  Manager.find({}, { employees: 0, __v: 0, settings: 0 }, function (err, managers) {
    if (err) return res.status(500).send("The server encountered an internal error. Please retry the request.");
    res.status(200).send(managers);
  });
});

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
      Manager.create(req.body)
      .then(newManager => res.json(newManager))
      .catch(err => console.log(err));
    }
  });
});

// @route   GET api/managers/:mid
// @desc  Returns all data about a specificc employee
// @access  Private
router.get('/:mid', function(req,res) {
    Manager.findOne({'_id': req.params.mid}, { employees: 0, __v: 0 }, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

// @route   PUT api/managers/:mid
// @desc  Updates a specific manager
// @access  Private 
router.put('/:mid', function(req,res) {
    Manager.findByIdAndUpdate(req.params.mid, req.body, {new: true}, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

// @route   DELETE api/managers/:mid
// @desc  Deletes a specific manager
// @access  Private
router.delete('/:mid', function(req,res) {
    Manager.findByIdAndRemove(req.params.mid, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Manager '"+ manager.name +"' was deleted.");

    });
});

/*=================================== EMPLOYEE ROUTES ===================================*/
// @route   GET api/managers/:mid/emplpoyees
// @desc  Returns all employees of a specific manager
// @access  Private 
router.get('/:mid/employees', function(req,res) {
    Manager.findById(req.params.mid, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        else {
          Employee.find({ "_id": { $in: manager.employees } }, { shifts: 0, __v: 0 }, function(err, result) {
        if (err || !result) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(result);
      });
      }
  });
});

// @route   POST api/managers/:mid/emplpoyees
// @desc  Creats a employees of a specific manager
// @access  Public
router.post('/:mid/employees', function(req,res) {
  Employee.create(req.body, function(err, employee) {
    Manager.findOne({_id: req.params.mid}, function(err, manager) {
      if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
      else {
        manager.employees.push(employee);
        manager.save();
        res.status(200).send(req.body);
      }
    });
  });
});



module.exports = router;

