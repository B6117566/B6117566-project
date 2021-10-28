const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Province = require('./province.model');

const addressSchema = Schema(
  {
    zipcode: {
      type: String,
      minLength: [5, 'Quantity should be at least 5!'],
      maxLength: [5, 'Quantity should be at most 5!'],
      required: [true, 'Enter an zipcode!'],
      validate: [validator.isNumeric, 'Enter a valid zipcode format!'],
    },
    districtName: {
      type: String,
      required: [true, 'Enter an districtName!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid name province format!',
      },
    },
    subDistrictName: {
      type: String,
      required: [true, 'Enter an subDistrictName!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid name province format!',
      },
    },
    province_id: {
      type: Schema.Types.ObjectId,
      ref: 'Province',
      required: true,
    },
  },
  { versionKey: false, collection: 'Address' }
);

module.exports = mongoose.model('Address', addressSchema);
