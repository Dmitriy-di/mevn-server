const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  filename: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: Number,
    default: '',
    required: true,
  },
  mimeType: {
    type: String,
    default: '',
  },
});

module.exports = model('File', schema);
