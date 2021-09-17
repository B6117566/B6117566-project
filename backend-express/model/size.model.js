const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = Schema(
  {
    name: {
      type: String,
      require: [true, 'Enter an name size!'],
      validate: [validator.isAlpha, 'Enter a valid name size format!'],
    },
    code: {
      type: String,
      require: [true, 'Enter an code size!'],
      validate: [validator.isAlphanumeric, 'Enter a valid code size format!'],
    },
  },
  { versionKey: false, collection: 'Size' }
);

try {
  module.exports = mongoose.model('Size');
} catch (error) {
  module.exports = mongoose.model('Size', sizeSchema);
}
