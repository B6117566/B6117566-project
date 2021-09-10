const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Class',
  }
);

try {
  module.exports = mongoose.model('Class');
} catch (error) {
  module.exports = mongoose.model('Class', classSchema);
}
