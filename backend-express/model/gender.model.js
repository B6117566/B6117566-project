const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Gender',
  }
);

try {
  module.exports = mongoose.model('Gender');
} catch (error) {
  module.exports = mongoose.model('Gender', genderSchema);
}
