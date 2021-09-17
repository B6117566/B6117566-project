const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Province = require('./province.model');

const addressSchema = Schema(
  {
    zipcode: {
      type: Number,
      min: [5, 'Quantity should be at least 5!'],
      max: [5, 'Quantity should be at most 5!'],
      required: [true, 'Enter an zipcode!'],
      validate: [validator.isNumeric, 'Enter a valid zipcode format!'],
    },
    districtName: {
      type: String,
      required: [true, 'Enter an districtName!'],
    },
    subDistrictName: {
      type: String,
      required: [true, 'Enter an subDistrictName!'],
    },
    province_id: {
      type: Schema.Types.ObjectId,
      ref: 'Province',
      required: true,
    },
  },
  { versionKey: false, collection: 'Address' }
);

try {
  module.exports = mongoose.model('Address');
} catch (error) {
  module.exports = mongoose.model('Address', addressSchema);
}
