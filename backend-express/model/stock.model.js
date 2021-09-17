const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product.model');
const Size = require('./size.model');

const stockSchema = Schema(
  {
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    prices: {
      type: Number,
      min: 1,
      required: true,
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
