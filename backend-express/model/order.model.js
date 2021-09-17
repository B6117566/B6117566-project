const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = require('./cart.model');
const User = require('./user.model');

const orderSchema = Schema(
  {
    total: {
      type: Number,
      min: [1, 'Order Total should be at least 1!'],
      required: [true, 'Enter a order total.'],
      validate: [validator.isNumeric, 'Enter a valid order total format!'],
    },
    cart_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, collection: 'Order' }
);

try {
  module.exports = mongoose.model('Order');
} catch (error) {
  module.exports = mongoose.model('Order', orderSchema);
}
