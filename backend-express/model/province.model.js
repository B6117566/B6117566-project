const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter an name!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid name format!',
      },
    },
  },
  { versionKey: false, collection: 'Province' }
);

module.exports = mongoose.model('Province', provinceSchema);
