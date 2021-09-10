const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = require('./class.model');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
      },
  },
  {
    collection: 'Category',
  }
);

try {
  module.exports = mongoose.model('Category');
} catch (error) {
  module.exports = mongoose.model('Category', categorySchema);
}