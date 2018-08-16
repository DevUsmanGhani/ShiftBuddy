const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./Employee');
const InventoryItem = require('./InventoryItem');

// Creating Manager Schema
const ManagerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  settings: {
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryItem"
      }
    ]
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Employee"

    }
  ]
},
{
  strict: true
}
);


module.exports = Manager = mongoose.model('Manager', ManagerSchema);
