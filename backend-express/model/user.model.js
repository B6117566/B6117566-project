const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = require('./address.model');
const UserRole = require('./userrole.model');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    addressDetail: {
      type: String,
      required: true,
    },
    address_id: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    userRole_id: {
      type: Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
    },
  },
  {
    collection: 'User',
  }
);

try {
  module.exports = mongoose.model('User');
} catch (error) {
  module.exports = mongoose.model('User', userSchema);
}
