const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = require('./cart.model');
const User = require('./user.model');

const orderSchema = Schema(
  {
    total: {
      type: Number,
      min: [1, 'Total price should be at least 1!'],
      required: [true, 'Enter a total price.'],
      validate: {
        validator: function (v) {
          return /^[\d\.]+$/.test(v);
        },
        message: 'Enter a valid total price format!',
      },
    },
    cart_id: {
      type: [Schema.Types.ObjectId],
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

module.exports = mongoose.model('Order', orderSchema);
