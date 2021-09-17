const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gender = require('./gender.model');
const Category = require('./category.model');

const productSchema = Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    composition: {
      type: String,
      required: true,
    },
    washingInformation: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
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
