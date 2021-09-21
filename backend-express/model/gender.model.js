const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter an name!'],
      validate: [validator.isAlpha, 'Enter a valid name format!'],
    },
  },
  { versionKey: false, collection: 'Gender' }
);

try {
  module.exports = mongoose.model('Gender');
} catch (error) {
  module.exports = mongoose.model('Gender', genderSchema);
}
