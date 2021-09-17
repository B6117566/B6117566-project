const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Province = require('./province.model');

const addressSchema = Schema(
  {
    zipcode: {
      type: Number,
      min: 5,
      max: 5,
      required: true,
    },
    districtName: {
      type: String,
      required: true,
    },
    subDistrictName: {
      type: String,
      required: true,
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
