const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = require('./address.model');
const UserRole = require('./userrole.model');

const userSchema = Schema(
  {
    email: {
      type: String,
      require: [true, 'Enter an email address.'],
      unique: [true, 'That email address is taken.'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Enter a password.'],
      minLength: [4, 'Password should be at least four characters'],
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
  { timestamps: true, versionKey: false, collection: 'User' }
);

try {
  module.exports = mongoose.model('User');
} catch (error) {
  module.exports = mongoose.model('User', userSchema);
}
