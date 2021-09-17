const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product.model');
const Size = require('./size.model');

const stockSchema = Schema(
  {
    quantity: {
      type: Number,
      min: [0, 'Quantity Stock should be at least 0!'],
      required: [true, 'Enter a quantity.'],
      validate: [validator.isNumeric, 'Enter a valid quantity format!'],
    },
    prices: {
      type: Number,
      min: [1, 'Prices Stock should be at least 1!'],
      required: [true, 'Enter a prices.'],
      validate: [validator.isNumeric, 'Enter a valid prices format!'],
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    size_id: {
      type: Schema.Types.ObjectId,
      ref: 'Size',
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: 'Stock' }
);

try {
  module.exports = mongoose.model('Stock');
} catch (error) {
  module.exports = mongoose.model('Stock', stockSchema);
}
