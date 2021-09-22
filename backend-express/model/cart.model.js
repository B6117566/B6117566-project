const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = require('./stock.model');
const User = require('./user.model');

const cartSchema = Schema(
  {
    quantity: {
      type: Number,
      min: [1, 'Quantity item should be at least 1!'],
      required: [true, 'Enter a quantity item.'],
      validate: {
        validator: function (v) {
          return /^[\d]+$/.test(v);
        },
        message: 'Enter a valid quantity item format!',
      },
    },
    isCart: { type: Boolean, default: true },
    stock_id: {
      type: Schema.Types.ObjectId,
      ref: 'Stock',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, collection: 'Cart' }
);

module.exports = mongoose.model('Cart', cartSchema);
