const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gender = require('./gender.model');
const Category = require('./category.model');

const productSchema = Schema(
  {
    code: {
      type: String,
      require: [true, 'Enter an code product!'],
      validate: [
        validator.isAlphanumeric,
        'Enter a valid code product format!',
      ],
    },
    name: {
      type: String,
      required: [true, 'Enter an name product!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid name product format!',
      },
    },
    shortDescription: {
      type: String,
      require: [true, 'Enter an shortDescription!'],
    },
    longDescription: {
      type: String,
      require: [true, 'Enter an longDescription!'],
    },
    composition: {
      type: String,
      require: [true, 'Enter an composition!'],
    },
    washingInformation: {
      type: String,
      require: [true, 'Enter an washingInformation!'],
    },
    file: {
      type: String,
      require: [true, 'Enter an name file!'],
    },
    img: {
      type: String,
      require: [true, 'Enter an img file!'],
    },
    isSale: { type: Boolean, default: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: 'Product' }
);

try {
  module.exports = mongoose.model('Product');
} catch (error) {
  module.exports = mongoose.model('Product', productSchema);
}
