const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: Number,
    default: '',
    required: true,
  },
  uploadDate: {
    type: Date,
    default: '',
    required: true,
  },
  md5: {
    type: String,
    default: '',
    required: true,
  },
  contentType: {
    type: String,
    default: '',
    required: true,
  },
  size: {
    type: Number,
    default: '',
    required: true,
  },
  encoding: {
    type: String,
    default: '',
    required: true,
  },
  bucketName: {
    type: String,
    default: '',
    required: true,
  },
  subject: {
    type: ObjectId,
    ref: 'Subject',
    required: true,
  },
});

module.exports = model('File', schema);
