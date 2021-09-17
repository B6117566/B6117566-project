const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = require('./class.model');

const categorySchema = Schema(
  {
    name: {
      type: String,
      require: [true, 'Enter an name category!'],
      validate: {
        validator: function (v) {
          return /^[\u0E00-\u0E7Fa-zA-Z\s\-]+$/.test(v);
        },
        message: 'Enter a valid name category format!',
      },
    },
    class_id: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    gender_id: {
      type: Schema.Types.ObjectId,
      ref: 'Gender',
      required: true,
    },
  },
  { versionKey: false, collection: 'Category' }
);

try {
  module.exports = mongoose.model('Category');
} catch (error) {
  module.exports = mongoose.model('Category', categorySchema);
}
