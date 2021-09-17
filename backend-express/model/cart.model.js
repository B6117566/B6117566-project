const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = require('./stock.model');
const User = require('./user.model');

const cartSchema = Schema(
  {
    quantity: {
      type: Number,
      min: [1, 'Quantity Cart should be at least 1!'],
      required: [true, 'Enter a quantity cart.'],
      validate: [validator.isNumeric, 'Enter a valid quantity cart format!'],
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

try {
  module.exports = mongoose.model('Cart');
} catch (error) {
  module.exports = mongoose.model('Cart', cartSchema);
}
