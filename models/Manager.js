const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId,
        ref: "InventoryItem"
      }
    ]
  },
  employees: [
    {
      type: Schema.Types.ObjectId, 
      ref: "Employee"
    }
  ],
  shifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shift"
    }
  ]
},
{
  strict: true
}
);


module.exports = Manager = mongoose.model('Manager', ManagerSchema);
