const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter an name!'],
      validate: {
        validator: function (v) {
          return /[\w\d\s\/\-\.]+$/.test(v);
        },
        message: 'Enter a valid name format!',
      },
    },
    code: {
      type: String,
      required: [true, 'Enter an code size!'],
      unique: [true, 'That code size is taken!'],
      validate: {
        validator: function (v) {
          return /^[\w]{6}$/.test(v);
        },
        message: 'Enter a valid code size format!',
      },
    },
  },
  { versionKey: false, collection: 'Size' }
);

module.exports = mongoose.model('Size', sizeSchema);
