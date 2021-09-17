const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userroleSchema = Schema(
  {
    role: {
      type: String,
      required: true,
    },
    authorizationPart: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, collection: 'UserRole' }
);

try {
  module.exports = mongoose.model('UserRole');
} catch (error) {
  module.exports = mongoose.model('UserRole', userroleSchema);
}
