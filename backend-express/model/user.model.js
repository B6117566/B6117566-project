const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = require('./address.model');
const UserRole = require('./userrole.model');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Enter an email address!'],
      unique: [true, 'That email address is taken!'],
      lowercase: true,
      validate: [validator.isEmail, 'Enter a valid email address!'],
    },
    password: {
      type: String,
      required: [true, 'Enter a password.'],
      minLength: [6, 'Password should be at least 6 characters!'],
      maxlength: [16, 'Password should be at most 16 characters!'],
      validate: [validator.isAlphanumeric, 'Enter a valid password format!'],
    },
    firstname: {
      type: String,
      required: [true, 'Enter an firstname!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid firstname format!',
      },
    },
    lastname: {
      type: String,
      required: [true, 'Enter an lastname!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid lastname format!',
      },
    },
    phone: {
      type: String,
      required: [true, 'Enter an phone number!'],
      validate: {
        validator: function (v) {
          return /^(\d{3})-(\d{3})-(\d{4})$/.test(v);
        },
        message: 'Enter a valid phone number format! xxx-xxx-xxxx',
      },
    },
    addressDetail: {
      type: String,
      required: [true, 'Enter an addressDetail!'],
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
