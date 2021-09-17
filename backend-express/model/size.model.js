const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, collection: 'Size' }
);

try {
  module.exports = mongoose.model('Size');
} catch (error) {
  module.exports = mongoose.model('Size', sizeSchema);
}
