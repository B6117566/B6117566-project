const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Province',
  }
);

try {
  module.exports = mongoose.model('Province');
} catch (error) {
  module.exports = mongoose.model('Province', provinceSchema);
}
