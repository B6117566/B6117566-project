const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userroleSchema = Schema(
  {
    role: {
      type: String,
      required: [true, 'Enter an role!'],
      validate: [validator.isAlpha, 'Enter a valid role format!'],
    },
    authorizationPart: {
      type: [String],
      required: [true, 'Enter an authorizationPart!'],
    },
  },
  { versionKey: false, collection: 'UserRole' }
);

module.exports = mongoose.model('UserRole', userroleSchema);
