const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product.model');
const Size = require('./size.model');

const stockSchema = Schema(
  {
    quantity: {
      type: Number,
      min: [0, 'Quantity item should be at least 0!'],
      required: [true, 'Enter a quantity item.'],
      validate: {
        validator: function (v) {
          return /^[\d]+$/.test(v);
        },
        message: 'Enter a valid quantity item format!',
      },
    },
    prices: {
      type: Number,
      min: [1, 'Prices should be at least 1!'],
      required: [true, 'Enter a prices.'],
      validate: {
        validator: function (v) {
          return /^[\d\.]+$/.test(v);
        },
        message: 'Enter a valid prices format!',
      },
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

module.exports = mongoose.model('Stock', stockSchema);
