const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = require('./cart.model');
const User = require('./user.model');

const orderSchema = Schema(
  {
    total: {
      type: Number,
      min: 1,
      required: true,
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
    orderd: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'Order',
  }
);

try {
  module.exports = mongoose.model('Order');
} catch (error) {
  module.exports = mongoose.model('Order', orderSchema);
}
