const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = Schema(
  {
    name: {
      type: String,
      require: [true, 'Enter an name province!'],
      validate: [validator.isAlpha, 'Enter a valid name province format!'],
    },
  },
  { versionKey: false, collection: 'Province' }
);

try {
  module.exports = mongoose.model('Province');
} catch (error) {
  module.exports = mongoose.model('Province', provinceSchema);
}
